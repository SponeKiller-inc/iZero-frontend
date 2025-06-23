import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';

import { registerUserLocal, registerUserGoogle } from '../services/registerService';
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

  const handleErrCode = (
    status: number
  ) => {
 
    let errMsg = t('http.4xx')
    if (status === 409) errMsg = t('http.409')
    if (status === 500) errMsg = t('http.500')

    setErrorMessage(errMsg)
    setMessage('')
  }

  const handleSubmitLocal = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      await registerUserLocal(formData);
      setFormData(initialValues);
      setMessage(t('http.201'));
      setErrorMessage('');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status ?? 500
        handleErrCode(status)
      } else {
        handleErrCode(500)
      }
    }
  };

  const handleSubmitGoogle = async (
    token: string
  ): Promise<void> => {


    try {
      await registerUserGoogle(token);
      setMessage(t('http.201'));
      setErrorMessage('');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status ?? 500
        handleErrCode(status)
      } else {
        handleErrCode(500)
      }
    }
  };

  return { 
    formData, 
    errorMessage, 
    message, 
    handleChange, 
    handleSubmitLocal, 
    handleSubmitGoogle 
  };
}