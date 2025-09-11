import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import { LoginService } from '../services/loginService';
import { UseHandlersGoogleReturn } from '../types';


export function useHandlersGoogle(
  loginService: LoginService,
  initialValues: string
): UseHandlersGoogleReturn {
  const { t } = useTranslation('pages/Login');
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();

  const handleSubmit = async (token: string) => {
    try {
      await loginService.loginGoogle(token);
      setFormData(initialValues);
      toast.success(t('http.200'));
      navigate('/dashboard');
    } catch (err: unknown) {
      let status = 500;

      if (isAxiosError(err)) {
        status = err.response?.status ?? 500;
      }
      toast.error(t('http.' + status))
    }
  };

  return {
    formData,
    handleSubmit
  };
}