import { AxiosInstance } from 'axios';

import apiSecure from './apiSecure';


export class ModuleService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = apiSecure;
  }

  /**
   * Retrieves user modules
   *
   * @returns {Promise<Record<string, Array<string>>>} user modules
   * @throws {AxiosError} 404 - No user modules found
   * @throws {AxiosError} 500 - Internal server error
   */
  public async get_user_modules(user_id: number): Promise<Record<string, Array<string>>> {
    const response = await this.api.get(`${user_id}/modules`)
    return response.data
  }
}