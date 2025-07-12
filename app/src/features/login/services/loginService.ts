import { LoginUserDataLocal } from '../types';
import { AccessTokenData } from '@/types/auth';
import { LocalStorageService, LOCAL_STORAGE } from '@/services/localStorage';
import { toUrlSearchParams } from '@/utils/toUrlSearchParm';
import api from '@/services/api';


export class LoginService {
  private storage: LocalStorageService;
  private static readonly TOKEN_KEY = LOCAL_STORAGE.accessToken.key;

  constructor(storage: LocalStorageService) {
    this.storage = storage
  }

  /**
   * Login for user with locally created accoount
   */
  async loginLocal(userData: LoginUserDataLocal): Promise<void> {
    const { data } = await api.post<AccessTokenData>(
      '/token/local', 
      toUrlSearchParams(userData), {
      headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    
    // Store access token to localstorage
    this.storage.save(
      { [LoginService.TOKEN_KEY]: data.token_type + ' ' + data.access_token}
    );
  }

  /**
   * Login for user which created account via Google
   */
  async loginGoogle(token: string): Promise<void> {
    const { data } = await api.post<AccessTokenData>('/token/google', {jwt_token: token});

    // Store access token to localstorage
    this.storage.save(
      { [LoginService.TOKEN_KEY]: data.token_type + ' ' + data.access_token}
    );
  }
}


