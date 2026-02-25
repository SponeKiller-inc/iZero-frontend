import { useState, ChangeEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { CustomerService } from '../services/customerService';

import { CustomerRecord } from '../types';
import { CrudHandler } from '@/types/crud';

export const useDeleteCustomer: CrudHandler<CustomerRecord> = (initialData) => {
  const customerService = new CustomerService();
  const { t } = useTranslation('pages/catalog/Customer');
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { id, ...data} = formData
      const updatedRecord = await customerService.update(id, data); 
      setFormData(updatedRecord);

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