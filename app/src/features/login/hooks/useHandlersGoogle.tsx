import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';

import { LoginService } from '../services/loginService';
import { UseHandlersGoogleReturn } from '../types';



export function useHandlersGoogle(
  loginService: LoginService,
  initialValues: string
): UseHandlersGoogleReturn {
  const { t } = useTranslation('pages/Login');
  const [formData, setFormData] = useState(initialValues);
  const [message, setMessage] = useState('');
  const [errorMessage, setError] = useState('');

  const handleSubmit = async (token: string) => {
    try {
      await loginService.loginGoogle(token);
      
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
    handleSubmit
  };
}