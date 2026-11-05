import { ChangeEvent, FocusEvent, FormEvent, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { CatalogueService } from '@/services/CatalogueService';
import { API_MESSAGE_ID } from '@/services/messageId';
import { UserService } from '@/services/UserService';
import { UserContext } from '@/context/UserContext';
import useLoad from '@/hooks/useLoad';
import getApiMessageId from '@/utils/getApiMessageId';
import { EMPTY_FORM, toPersonForm, toPersonInput } from '../mappers';
import { validatePersonForm } from '../validation';
import { FieldControls, PersonForm } from '../types';

const REPRESENTATIVE_PREFIX = 'representative.';

const usePersonDetails = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const userService = useMemo(() => new UserService(), []);
  const catalogueService = useMemo(() => new CatalogueService(), []);
  const { userID } = useContext(UserContext);

  const loadPerson = useCallback(() => userService.getPerson(userID), [userService, userID]);
  const loadCatalogues = useCallback(async () => {
    const [titles, legalForms, phonePrefixes] = await Promise.all([
      catalogueService.getTitles(),
      catalogueService.getLegalForms(),
      catalogueService.getPhonePrefixes(),
    ]);

    return { titles, legalForms, phonePrefixes };
  }, [catalogueService]);

  const person = useLoad(loadPerson);
  const [isEditing, setIsEditing] = useState(false);

  const isAdding = person.status === 'ready' && person.data === null;
  const isFormOpen = isEditing || isAdding;

  const catalogues = useLoad(loadCatalogues, isFormOpen);

  const [form, setForm] = useState<PersonForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'alreadyExists' | 'validation' | 'phone' | 'email' | 'generic'
  >('idle');

  const isSubmitting = useRef(false);

  const clientErrors = validatePersonForm(form);
  const isSaving = saveStatus === 'saving';
  const canSubmit = catalogues.status === 'ready'
    && Object.values(clientErrors).every((error) => !error)
    && !isSaving;

  const fieldErrors: FieldControls['errors'] = {};
  Object.entries(clientErrors).forEach(([field, error]) => {
    if (touched[field] && error) {
      fieldErrors[field] = t(`personDetails.errors.${error}`);
    }
  });

  const setFieldValue = (fieldName: string, value: string | boolean | string[]) => {
    setForm((prev) => {
      if (fieldName.startsWith(REPRESENTATIVE_PREFIX)) {
        const field = fieldName.slice(REPRESENTATIVE_PREFIX.length);
        return { ...prev, representative: { ...prev.representative, [field]: value } };
      }
      return { ...prev, [fieldName]: value };
    });
    setSaveStatus('idle');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const isCheckbox = type === 'checkbox';

    setFieldValue(name, isCheckbox ? (e.target as HTMLInputElement).checked : value);

    // The VAT ID becomes required with this checkbox
    if (name === 'isVatPayer') {
      setTouched((prev) => ({ ...prev, vatNumber: true }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;

    // The prefix and the number are required together, the error of the other one explains the disabled save
    const pairedName = name.endsWith('phoneNumber')
      ? name.replace('phoneNumber', 'phonePrefixId')
      : name.replace('phonePrefixId', 'phoneNumber');

    setTouched((prev) => ({ ...prev, [name]: true, [pairedName]: true }));
  };

  const startEdit = () => {
    if (person.data) {
      setForm(toPersonForm(person.data));
      setTouched({});
      setSaveStatus('idle');
      setIsEditing(true);
    }
  };

  const cancelEdit = () => setIsEditing(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting.current || !canSubmit) {
      return;
    }

    isSubmitting.current = true;
    setSaveStatus('saving');

    const input = toPersonInput(form, catalogues.data?.titles ?? []);

    try {
      const saved = isAdding
        ? await userService.addPerson(userID, input)
        : await userService.changePerson(userID, input);

      person.setData(saved);
      setIsEditing(false);
      setSaveStatus('idle');
      toast.success(t('details.success'));
    } catch (error: unknown) {
      switch (getApiMessageId(error)) {
        case API_MESSAGE_ID.personAlreadyExists:
          setSaveStatus('alreadyExists');
          break;
        case API_MESSAGE_ID.personValidationFailed:
          setSaveStatus('validation');
          break;
        case API_MESSAGE_ID.phoneValidationFailed:
          setSaveStatus('phone');
          break;
        case API_MESSAGE_ID.emailValidationFailed:
          setSaveStatus('email');
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
    person,
    catalogues,
    form,
    fieldErrors,
    saveStatus,
    isSaving,
    isAdding,
    isFormOpen,
    canSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    startEdit,
    cancelEdit,
  };
};

export default usePersonDetails;
