import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import { registerUserLocal, registerUserGoogle } from '../services/registerService';
import { UseHandlersReturn, RegisterUserData } from '../types';

export function useHandlers(
  initialValues: RegisterUserData
): UseHandlersReturn {
  const { t } = useTranslation('pages/Registration');
  const [formData, setFormData] = useState<RegisterUserData>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLocal = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      await registerUserLocal(formData);
      setFormData(initialValues);
      toast.success(t('http.201'));
    } catch (error: unknown) {
      let status = 500;
      if (isAxiosError(error)) {
        status = error.response?.status ?? 500
      }

      toast.error(t('http.' + status))
    }
  };

  const handleSubmitGoogle = async (
    token: string
  ): Promise<void> => {


    try {
      await registerUserGoogle(token);
      toast.success(t('http.201'));
    } catch (error: unknown) {
      let status = 500;
      if (isAxiosError(error)) {
        status = error.response?.status ?? 500
      }
      toast.error(t('http.' + status))
    }
  };

  return { 
    formData, 
    handleChange, 
    handleSubmitLocal, 
    handleSubmitGoogle 
  };
}