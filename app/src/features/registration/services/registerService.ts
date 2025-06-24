import { AxiosResponse } from 'axios';
import { RegisterUserData } from '../types';
import api from '@/services/api';

export const registerUserLocal = async (
  userData: RegisterUserData
): Promise<number> => {
  const response: AxiosResponse<void> = 
    await api.post<void>(
      '/users/local', 
      userData
    );
  return response.status;
};

export const registerUserGoogle = async (
  token: string
): Promise<number> => {
   const body = { jwt_token: token };

  const response: AxiosResponse<void> = 
    await api.post<void>(
      '/users/google', 
      body
    );
  return response.status;
};
