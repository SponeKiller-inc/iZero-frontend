import { AxiosResponse } from 'axios';
import { RegisterUserData } from '../types';
import api from '@/services/api';

export const registerUser = async (
  userData: RegisterUserData
): Promise<number> => {
    const response: AxiosResponse<void> = 
      await api.post<void>(
        '/users/local', 
        userData
      );
    return response.status;
};
