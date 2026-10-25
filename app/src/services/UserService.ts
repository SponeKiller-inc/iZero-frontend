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
}
