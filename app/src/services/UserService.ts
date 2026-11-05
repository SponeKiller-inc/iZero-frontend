import { AxiosInstance } from 'axios';

import apiSecure from './apiSecure';
import { UserBankAccountInput, UserBankAccountOutput } from '@/types/bank';
import { UserPersonInput, UserPersonOutput } from '@/types/person';


export class UserService {
  private api: AxiosInstance;

  constructor() {
    this.api = apiSecure;
  }

  /**
   * Deletes (deactivates) account of the user
   * @param {number} userID - ID of the signed-in user
   * @throws {AxiosError} 401 - User is not authenticated (e.g. account already deleted)
   * @throws {AxiosError} 404 - User not found or already deleted
   * @throws {AxiosError} 409 - User cannot be deleted (bootstrap admin)
   */
  public async deleteUser(userID: number): Promise<void> {
    await this.api.delete(`users/${userID}`);
  }

  /**
   * Changes password of the signed-in user
   * Other sessions of the user are ended by the server, the current one stays valid
   * @param {number} userID - ID of the signed-in user
   * @param passwords - current password, new password and its confirmation
   * @throws {AxiosError} 400 - Wrong current password or new password breaks a rule
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 404 - User not found
   * @throws {AxiosError} 409 - Account has no password (registered via Google)
   */
  public async changePassword(userID: number, passwords: {
    currentPassword: string;
    newPassword: string;
    passwordConfirmation: string;
  }): Promise<void> {
    await this.api.put(`users/${userID}/password`, passwords, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Retrieves person details of the signed-in user
   * @param {number} userID - ID of the signed-in user
   * @returns person details, null if the user has none
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 404 - Assigned person does not exist
   */
  public async getPerson(userID: number): Promise<UserPersonOutput | null> {
    const response = await this.api.get(`users/${userID}/person`);
    return response.data.data;
  }

  /**
   * Adds person details of the signed-in user
   * @param {number} userID - ID of the signed-in user
   * @param person - details of the requested person type
   * @returns stored person details
   * @throws {AxiosError} 400 - Person, phone or e-mail breaks a rule
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 409 - User already has person details
   */
  public async addPerson(userID: number, person: UserPersonInput): Promise<UserPersonOutput> {
    const response = await this.api.post(`users/${userID}/person`, { person }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.data;
  }

  /**
   * Changes person details of the signed-in user
   * @param {number} userID - ID of the signed-in user
   * @param person - details of the requested person type
   * @returns stored person details
   * @throws {AxiosError} 400 - Person, phone or e-mail breaks a rule
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 404 - User has no person details
   * @throws {AxiosError} 409 - Person type differs from the stored one
   */
  public async changePerson(userID: number, person: UserPersonInput): Promise<UserPersonOutput> {
    const response = await this.api.put(`users/${userID}/person`, { person }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.data;
  }

  /**
   * Retrieves bank account of the signed-in user
   * @param {number} userID - ID of the signed-in user
   * @returns bank account with its bank, null if the user has none
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 404 - Assigned bank account or its bank does not exist
   */
  public async getBankAccount(userID: number): Promise<UserBankAccountOutput | null> {
    const response = await this.api.get(`users/${userID}/bank-account`);
    return response.data.data;
  }

  /**
   * Adds bank account of the signed-in user
   * @param {number} userID - ID of the signed-in user
   * @param bankAccount - bank from the catalogue and account details
   * @returns stored bank account with its bank
   * @throws {AxiosError} 400 - Bank account breaks a rule
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 404 - Bank is not in the catalogue
   * @throws {AxiosError} 409 - User already has a bank account
   */
  public async addBankAccount(userID: number, bankAccount: UserBankAccountInput): Promise<UserBankAccountOutput> {
    const response = await this.api.post(`users/${userID}/bank-account`, bankAccount, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.data;
  }

  /**
   * Changes bank account of the signed-in user
   * @param {number} userID - ID of the signed-in user
   * @param bankAccount - bank from the catalogue and account details
   * @returns stored bank account with its bank
   * @throws {AxiosError} 400 - Bank account breaks a rule
   * @throws {AxiosError} 401 - User is not authenticated
   * @throws {AxiosError} 404 - User has no bank account or bank is not in the catalogue
   */
  public async changeBankAccount(userID: number, bankAccount: UserBankAccountInput): Promise<UserBankAccountOutput> {
    const response = await this.api.put(`users/${userID}/bank-account`, bankAccount, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.data;
  }
}
