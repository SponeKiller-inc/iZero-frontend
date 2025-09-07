import { ChangeEvent, FormEvent } from 'react';

export interface LoginUserDataLocal {
  username: string;
  password: string;
}

export interface UseHandlersLocalReturn {
  formData: LoginUserDataLocal;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>;
}

export interface UseHandlersGoogleReturn {
  formData: string;
  handleSubmit(userData: string): Promise<void>;
}