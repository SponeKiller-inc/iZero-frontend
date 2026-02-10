import { useImperativeHandle, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { EditCustomerService } from '../service/EditCustomerService';
import { useEditCustomer } from './hooks/useEditCustomer';
import { EditLayout } from '@/components/ui/ts/EditLayout';
import CustomerDetailView from './CustomerDetailView';
import { CrudMode } from '@/constants/crud';

import { EditCustomerProps } from '../types';

import styles from './EditCustomer.module.css';

export const EditCustomer: React.FC<EditCustomerProps> = ({ data }) => {
  const editCustomerService = new EditCustomerService();
  const { handleSubmit, handleChange, formData } = useEditCustomer(editCustomerService, data);


  return (
    <EditLayout onSave={handleSubmit} setShowEdit={setShowEdit}>
      <CustomerDetailView 
        mode={CrudMode.EDIT} 
        formData={formData}
        onChange={handleChange}
      />
    </EditLayout>
  );
};
