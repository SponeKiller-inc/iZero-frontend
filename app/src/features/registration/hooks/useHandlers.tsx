import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';

import { registerUser } from '../services/registerService';
import { UseHandlersReturn, RegisterUserData } from '../types';

export function useHandlers(
  initialValues: RegisterUserData
): UseHandlersReturn {
  const { t } = useTranslation('pages/Registration');

  const [formData, setFormData] = useState<RegisterUserData>(initialValues);
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      await registerUser(formData);
      setFormData(initialValues);
      setMessage(t('http.201'));
      setErrorMessage('');
    } catch (error: unknown) {
      let status: number | undefined;

      if (isAxiosError(error) && error.response) {
        status = error.response.status;
      }

      let errMsg = t('http.4xx');
      if (status === 409) errMsg = t('http.409');
      if (status === 500) errMsg = t('http.500');

      setErrorMessage(errMsg);
      setMessage('');
    }
  };

  return { formData, errorMessage, message, handleChange, handleSubmit };
}