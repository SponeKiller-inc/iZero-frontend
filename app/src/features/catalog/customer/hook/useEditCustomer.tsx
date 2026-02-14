import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { CustomerService } from '../services/customerService';

import { CustomerData } from '../types';
import { CrudHandler } from '@/types/crud';

export const useEditCustomer: CrudHandler<CustomerData> = (customerData) => {
  const customerService = new CustomerService();
  const { t } = useTranslation('pages/catalog/Customer');
  let formData = customerData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    formData = { ...formData, [name]: value };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      formData = await customerService.update(formData); 
      toast.success(t('http.200'));
    } catch (err: unknown) {
      let status = 500;
      if (isAxiosError(err)) {
        status = err.response?.status ?? 500;
      }

      toast.error(t('http.' + status));
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};