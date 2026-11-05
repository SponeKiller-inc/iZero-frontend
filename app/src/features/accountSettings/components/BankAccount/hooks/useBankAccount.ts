import { ChangeEvent, FocusEvent, FormEvent, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { CatalogueService } from '@/services/CatalogueService';
import { API_MESSAGE_ID } from '@/services/messageId';
import { UserService } from '@/services/UserService';
import { UserContext } from '@/context/UserContext';
import useLoad from '@/hooks/useLoad';
import { findBank, getBankLabel, normalizeIban } from '@/utils/bankUtils';
import getApiMessageId from '@/utils/getApiMessageId';
import { validateBankAccountForm } from '../validation';
import { BankAccountFieldName, BankAccountForm } from '../types';

// Accounts without prefix are stored with zeros
const EMPTY_ACCOUNT_PREFIX = '000000';

const EMPTY_FORM: BankAccountForm = {
  bank: '',
  ownerName: '',
  accountPrefix: '',
  accountNumber: '',
  iban: '',
};

const useBankAccount = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const userService = useMemo(() => new UserService(), []);
  const catalogueService = useMemo(() => new CatalogueService(), []);
  const { userID } = useContext(UserContext);

  const loadAccount = useCallback(() => userService.getBankAccount(userID), [userService, userID]);
  const loadBanks = useCallback(() => catalogueService.getBanks(), [catalogueService]);

  const account = useLoad(loadAccount);
  const [isEditing, setIsEditing] = useState(false);

  const isAdding = account.status === 'ready' && account.data === null;
  const isFormOpen = isEditing || isAdding;

  const catalogue = useLoad(loadBanks, isFormOpen);
  const banks = useMemo(() => catalogue.data ?? [], [catalogue.data]);

  const [form, setForm] = useState<BankAccountForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<BankAccountFieldName, boolean>>>({});
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'alreadyExists' | 'bankNotFound' | 'validation' | 'generic'
  >('idle');

  const isSubmitting = useRef(false);

  const selectedBank = findBank(banks, form.bank);
  const clientErrors = validateBankAccountForm(form, banks);
  const isSaving = saveStatus === 'saving';
  const canSubmit = catalogue.status === 'ready' && Object.values(clientErrors).every((error) => !error) && !isSaving;

  const fieldErrors: Partial<Record<BankAccountFieldName, string>> = {};
  (Object.keys(clientErrors) as BankAccountFieldName[]).forEach((field) => {
    const error = clientErrors[field];

    if (touched[field] && error) {
      fieldErrors[field] = t(`bankAccount.errors.${error}`);
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as BankAccountFieldName;
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaveStatus('idle');
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as BankAccountFieldName;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const startEdit = () => {
    if (account.data) {
      setForm({
        bank: getBankLabel(account.data.bank),
        ownerName: account.data.ownerName,
        accountPrefix: account.data.accountPrefix === EMPTY_ACCOUNT_PREFIX ? '' : account.data.accountPrefix,
        accountNumber: account.data.accountNumber,
        iban: account.data.iban,
      });
      setTouched({});
      setSaveStatus('idle');
      setIsEditing(true);
    }
  };

  const cancelEdit = () => setIsEditing(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting.current || !canSubmit || !selectedBank) {
      return;
    }

    isSubmitting.current = true;
    setSaveStatus('saving');

    const input = {
      bankId: selectedBank.id,
      ownerName: form.ownerName.trim(),
      accountPrefix: form.accountPrefix.trim() || EMPTY_ACCOUNT_PREFIX,
      accountNumber: form.accountNumber.trim(),
      iban: normalizeIban(form.iban),
    };

    try {
      const saved = isAdding
        ? await userService.addBankAccount(userID, input)
        : await userService.changeBankAccount(userID, input);

      account.setData(saved);
      setIsEditing(false);
      setSaveStatus('idle');
      toast.success(t('details.success'));
    } catch (error: unknown) {
      switch (getApiMessageId(error)) {
        case API_MESSAGE_ID.bankAccountAlreadyExists:
          setSaveStatus('alreadyExists');
          break;
        case API_MESSAGE_ID.bankNotFound:
          setSaveStatus('bankNotFound');
          break;
        case API_MESSAGE_ID.bankAccountValidationFailed:
          setSaveStatus('validation');
          break;
        default:
          // Network failure or unknown error - the outcome may be unknown
          setSaveStatus('generic');
          break;
      }
    } finally {
      isSubmitting.current = false;
    }
  };

  return {
    account,
    catalogue,
    banks,
    form,
    fieldErrors,
    saveStatus,
    isSaving,
    isAdding,
    isFormOpen,
    canSubmit,
    selectedBank,
    handleChange,
    handleBlur,
    handleSubmit,
    startEdit,
    cancelEdit,
  };
};

export default useBankAccount;
