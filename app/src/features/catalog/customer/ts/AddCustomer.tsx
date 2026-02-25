import { useAddCustomer } from '../hook/useAddCustomer';
import { AddLayout } from '@/components/ui/ts/crud/AddLayout';
import { CustomerDetailView } from './CustomerDetailView';
import { CrudMode } from '@/constants/crud';

import { CustomerRecord } from '../types';


export interface AddCustomerProps {
  setShow: (state: boolean) => void;
  setItems: (items: CustomerRecord[]) => void;
  initialData: CustomerRecord;
}

export const AddCustomer: React.FC<AddCustomerProps> = ({ setShow, setItems, initialData }) => {
  const { handleSubmit, handleChange, formData } = useAddCustomer(initialData, setItems);


  return (
    <AddLayout onAdd={handleSubmit} setShowAdd={setShow}>
      <CustomerDetailView
        mode={CrudMode.ADD}
        formData={formData}
        onChange={handleChange}
      />
    </AddLayout>
  );
};
