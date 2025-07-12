// useHandlersLocal.ts
import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';

import { LoginService } from '../services/loginService';
import { LoginUserDataLocal, UseHandlersLocalReturn } from '../types';

export function useHandlersLocal(
  loginService: LoginService,
  initialValues: LoginUserDataLocal
): UseHandlersLocalReturn {
  const { t }  = useTranslation('pages/Login');
  const [formData, setFormData] = useState(initialValues);
  const [message, setMessage] = useState('');
  const [errorMessage, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginService.loginLocal(formData);

      setFormData(initialValues);
      setMessage(t('http.200'));
      setError('');
    } catch (err: unknown) {
      let status = 500;
      if (isAxiosError(err)) {
        status = err.response?.status ?? 500;
      }

      // Error message for user 
      let errMsg = t('http.4xx');
      if (status === 401) errMsg = t('http.401');
      if (status === 500) errMsg = t('http.500');
      setError(errMsg);
      setMessage('');
    }
  };

  return {
    formData,
    message,
    errorMessage,
    handleChange,
    handleSubmit
  };
}
