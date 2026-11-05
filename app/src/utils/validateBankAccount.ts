import { normalizeIban } from './bankUtils';

const ACCOUNT_PREFIX_LENGTH = 6;
const ACCOUNT_NUMBER_LENGTH = 10;

export type BankAccountError = 'required' | 'accountPrefix' | 'accountNumber' | 'iban' | 'inconsistentAccount';

/**
 * Checks a part of a bank account by its rules (server stays authoritative)
 * @param part - part of the bank account, decides which rules are checked
 *   (accountPrefix is optional, iban is also compared with the rest of the account)
 * @param value - value to check
 * @param related - rest of the account the IBAN is compared with
 *   (the comparison is skipped until the bank code and a valid account are known)
 * @returns first broken rule, undefined when the value is valid
 */
const validateBankAccount = (
  part: 'accountPrefix' | 'accountNumber' | 'iban',
  value: string,
  related: { bankCode?: string; accountPrefix?: string; accountNumber?: string } = {},
): BankAccountError | undefined => {
  const trimmed = value.trim();

  switch (part) {
    case 'accountPrefix':
      return trimmed && !/^\d{1,6}$/.test(trimmed) ? 'accountPrefix' : undefined;
    case 'accountNumber':
      if (!trimmed) {
        return 'required';
      }
      return /^\d{1,10}$/.test(trimmed) ? undefined : 'accountNumber';
    case 'iban': {
      const iban = normalizeIban(value);
      const accountPrefix = related.accountPrefix?.trim() ?? '';
      const accountNumber = related.accountNumber?.trim() ?? '';

      if (!iban) {
        return 'required';
      }
      if (!/^CZ\d{22}$/.test(iban)) {
        return 'iban';
      }
      if (
        !related.bankCode
        || validateBankAccount('accountPrefix', accountPrefix)
        || validateBankAccount('accountNumber', accountNumber)
      ) {
        return undefined;
      }

      // A Czech IBAN is made of the bank code, account prefix and account number
      // padded with zeros, which follow the country code and two check digits
      const expected = related.bankCode
        + accountPrefix.padStart(ACCOUNT_PREFIX_LENGTH, '0')
        + accountNumber.padStart(ACCOUNT_NUMBER_LENGTH, '0');

      return iban.slice(4) === expected ? undefined : 'inconsistentAccount';
    }
  }
};

export default validateBankAccount;
