import { useEditCustomer } from '../hook/useEditCustomer';
import { EditLayout } from '@/components/ui/ts/EditLayout';
import { CustomerDetailView } from './CustomerDetailView';
import { CrudMode } from '@/constants/crud';

import { EditState } from "@/types/crud";
import { CustomerRecord } from '../types';

export interface EditCustomerProps extends EditState {
    data: CustomerRecord;
}

export const EditCustomer: React.FC<EditCustomerProps> = ({ data, setShowEdit }) => {
  const { handleSubmit, handleChange, formData } = useEditCustomer(data);


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
