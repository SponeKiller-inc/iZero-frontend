import { ChangeEvent, FormEvent } from 'react';

export interface RegisterUserData {
  email: string;
  password: string;
}

export interface UseHandlersReturn {
  formData: RegisterUserData;
  errorMessage: string;
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}