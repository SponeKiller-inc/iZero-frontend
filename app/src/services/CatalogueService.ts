import { AxiosInstance } from 'axios';

import apiSecure from './apiSecure';
import { Bank } from '@/types/bank';
import { LegalForm, PhonePrefix, Title } from '@/types/person';


export class CatalogueService {
  private api: AxiosInstance;

  constructor() {
    this.api = apiSecure;
  }

  /**
   * Retrieves the bank catalogue
   * @returns list of banks
   * @throws {AxiosError} 401 - User is not authenticated
   */
  public async getBanks(): Promise<Bank[]> {
    const response = await this.api.get('lookups/banks');
    return response.data.data;
  }

  /**
   * Retrieves the catalogue of academic titles
   * @returns list of titles
   * @throws {AxiosError} 401 - User is not authenticated
   */
  public async getTitles(): Promise<Title[]> {
    const response = await this.api.get('lookups/titles');
    return response.data.data;
  }

  /**
   * Retrieves the catalogue of legal forms
   * @returns list of legal forms
   * @throws {AxiosError} 401 - User is not authenticated
   */
  public async getLegalForms(): Promise<LegalForm[]> {
    const response = await this.api.get('lookups/legal-forms');
    return response.data.data;
  }

  /**
   * Retrieves the catalogue of phone prefixes
   * @returns list of phone prefixes
   * @throws {AxiosError} 401 - User is not authenticated
   */
  public async getPhonePrefixes(): Promise<PhonePrefix[]> {
    const response = await this.api.get('lookups/phone-prefixes');
    return response.data.data;
  }
}
