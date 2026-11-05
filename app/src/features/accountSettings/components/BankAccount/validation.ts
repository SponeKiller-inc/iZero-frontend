import { Bank } from '@/types/bank';
import { findBank } from '@/utils/bankUtils';
import validateBankAccount from '@/utils/validateBankAccount';
import { BankAccountForm, FieldErrors } from './types';

const validateBank = (bankLabel: string, bank: Bank | undefined): FieldErrors['bank'] => {
  if (!bankLabel.trim()) {
    return 'required';
  }
  return bank ? undefined : 'bankNotInCatalogue';
};

/**
 * Checks all fields of the bank account form before sending
 * @param form - current values of the form
 * @param banks - bank catalogue
 * @returns error per field, undefined for a valid field
 */
export const validateBankAccountForm = (form: BankAccountForm, banks: Bank[]): FieldErrors => {
  const bank = findBank(banks, form.bank);

  return {
    bank: validateBank(form.bank, bank),
    ownerName: form.ownerName.trim() ? undefined : 'required',
    accountPrefix: validateBankAccount('accountPrefix', form.accountPrefix),
    accountNumber: validateBankAccount('accountNumber', form.accountNumber),
    iban: validateBankAccount('iban', form.iban, {
      bankCode: bank?.code,
      accountPrefix: form.accountPrefix,
      accountNumber: form.accountNumber,
    }),
  };
};
