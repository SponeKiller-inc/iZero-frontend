import { Bank } from '@/types/bank';

/**
 * Removes the spaces IBANs are usually written with and unifies the letter case
 * @param iban - IBAN as entered by the user
 */
export const normalizeIban = (iban: string): string => iban.replace(/\s/g, '').toUpperCase();

/**
 * Text of a bank in the bank selection, searchable by both name and bank code
 * @param bank - bank from the catalogue
 */
export const getBankLabel = (bank: Bank): string => `${bank.name} (${bank.code})`;

/**
 * Finds the bank chosen in the bank selection
 * @param banks - bank catalogue
 * @param label - text of the bank in the bank selection
 * @returns the bank, undefined if the text does not match any bank
 */
export const findBank = (banks: Bank[], label: string): Bank | undefined => (
  banks.find((bank) => getBankLabel(bank) === label)
);
