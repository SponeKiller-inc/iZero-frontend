import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { LoginService } from '../services/loginService';
import { LoginUserDataLocal, UseHandlersLocalReturn } from '../types';

export function useHandlersLocal(
  loginService: LoginService,
  initialValues: LoginUserDataLocal
): UseHandlersLocalReturn {
  const { t }  = useTranslation('pages/Login');
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginService.loginLocal(formData);
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
    handleChange,
    handleSubmit
  };
}
