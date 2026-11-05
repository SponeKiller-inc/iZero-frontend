export type Bank = {
  id: number;
  name: string;
  code: string;
};

export type UserBankAccountOutput = {
  id: number;
  ownerName: string;
  accountPrefix: string;
  accountNumber: string;
  iban: string;
  bank: Bank;
};

export type UserBankAccountInput = {
  bankId: number;
  ownerName: string;
  accountPrefix: string;
  accountNumber: string;
  iban: string;
};
