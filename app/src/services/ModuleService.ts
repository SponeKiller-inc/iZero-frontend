import { AxiosInstance } from 'axios';

import apiSecure from './apiSecure';


export class ModuleService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = apiSecure;
  }

  /**
   * Retrieves user modules
   * @param {number} userID - ID of the user
   * @returns {Promise<Record<string, Array<string>>>} user modules
   * @throws {AxiosError} 404 - No user modules found
   * @throws {AxiosError} 500 - Internal server error
   */
  public async get_user_modules(userID: number): Promise<Record<string, Array<string>>> {
    const response = await this.api.get(`${userID}/modules`)
    return response.data
  }
}