import { AxiosInstance } from 'axios';

import apiSecure from './apiSecure';


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
}
