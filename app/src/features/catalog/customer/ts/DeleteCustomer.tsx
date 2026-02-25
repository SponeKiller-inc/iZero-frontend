import { useDeleteCustomer } from '../hook/useDeleteCustomer';
import { DeleteLayout } from '@/components/ui/ts/crud/DeleteLayout';
import { CustomerDetailView } from './CustomerDetailView';
import { CrudMode } from '@/constants/crud';

import { CustomerRecord } from '../types';

export interface DeleteCustomerProps {
  setShow: (state: boolean) => void;
  setItems: (items: CustomerRecord[]) => void;
  initialData: CustomerRecord;
}

export const DeleteCustomer: React.FC<DeleteCustomerProps> = ({ setShow, setItems, initialData }) => {
  const { handleSubmit, handleChange, formData } = useDeleteCustomer(initialData, setItems);


  return (
    <DeleteLayout onDelete={handleSubmit} setShowDelete={setShow}>
      <CustomerDetailView
        mode={CrudMode.DELETE}
        formData={formData}
        onChange={handleChange}
      />
    </DeleteLayout>
  );
};
