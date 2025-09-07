import { ChangeEvent, FormEvent } from 'react';

export interface RegisterUserData {
  email: string;
  password: string;
}

export interface UseHandlersReturn {
  formData: RegisterUserData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitLocal: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleSubmitGoogle: (token: string) => Promise<void>;
}