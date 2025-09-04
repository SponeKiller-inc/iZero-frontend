import { jwtDecode } from "jwt-decode";

import api from './api';
import { LocalStorageService, LOCAL_STORAGE } from '@/services/localStorage';
import { JwtTokenPayload } from '@/types/auth';

export class AuthService {
  private storage: LocalStorageService;
  private static readonly TOKEN_KEY = LOCAL_STORAGE.accessToken.key;
  
  constructor(storage: LocalStorageService) {
    this.storage = storage
  }
  /**
   * Ensures that the user is authenticated.
   *
   * First checks if the current access token is valid.
   * If not, it attempts to refresh the token.
   *
   * @returns {Promise<boolean>} True if the user is (or was successfully re-)authenticated,
   *  otherwise false.
   */
  public async ensureAuthenticated(): Promise<boolean> {
    if (this.isAuthenticated()) {
      return true
    }

    return await this.refreshToken();
  }

  /**
   * Verify validy of accessToken
   * @returns {boolean} True if token is valid, otherwise false
   */
  private isAuthenticated(): boolean {
    const accessToken = this.storage.load<string>(AuthService.TOKEN_KEY)
    if (accessToken != null) {
      const payload = jwtDecode<JwtTokenPayload>(accessToken)
      if (payload.exp * 1000 > Date.now()) {
        // AccessToken exists and is valid
        return true
      }
    }
    return false
  }

  /**
   * Attempts to refresh the access token.
   *
   * Returns true if the refresh succeeded, otherwise false.
   *
   * @returns {Promise<boolean>} True if the token was successfully refreshed,
   *  false on failure.
   */
  private async refreshToken(): Promise<boolean> {
    try {
      await api.post('/token/refresh');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Logout user
   *
   *
   * @returns {Promise<boolean>} True if user successfully logout
   */
  private async logout(): Promise<boolean> {
    this.storage.delete(AuthService.TOKEN_KEY);

    // call to backend to logout user
    // if logout successful return true
    // todo after api will be created 

    return false;
  }
}