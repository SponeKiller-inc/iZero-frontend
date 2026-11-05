import { BankAccountError } from '@/utils/validateBankAccount';

export type BankAccountForm = {
  bank: string;
  ownerName: string;
  accountPrefix: string;
  accountNumber: string;
  iban: string;
};

export type BankAccountFieldName = keyof BankAccountForm;

export type FieldErrors = Partial<Record<BankAccountFieldName, BankAccountError | 'bankNotInCatalogue'>>;
