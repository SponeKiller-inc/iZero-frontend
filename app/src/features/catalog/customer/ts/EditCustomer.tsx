import { useEditCustomer } from '../hook/useEditCustomer';
import { EditLayout } from '@/components/ui/ts/EditLayout';
import { CustomerDetailView } from './CustomerDetailView';
import { CrudMode } from '@/constants/crud';

import { CustomerRecord } from '../types';

export interface EditCustomerProps {
  setShow: (state: boolean) => void;
  setItems: (items: CustomerRecord[]) => void;
  initialData: CustomerRecord;
}

export const EditCustomer: React.FC<EditCustomerProps> = ({ setShow, setItems, initialData }) => {
  const { handleSubmit, handleChange, formData } = useEditCustomer(initialData, setItems);


  return (
    <EditLayout onSave={handleSubmit} setShowEdit={setShow}>
      <CustomerDetailView 
        mode={CrudMode.EDIT} 
        formData={formData}
        onChange={handleChange}
      />
    </EditLayout>
  );
};
