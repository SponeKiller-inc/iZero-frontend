import { ViewLayout } from '@/components/ui/ts/crud/ViewLayout';
import { CustomerDetailView } from './CustomerDetailView';
import { CrudMode } from '@/constants/crud';

import { CustomerRecord } from '../types';

export interface ViewCustomerProps {
  setShow: (state: boolean) => void;
  initialData: CustomerRecord;
}

export const ViewCustomer: React.FC<ViewCustomerProps> = ({ initialData, setShow }) => {

  return (
    <ViewLayout setShowView={setShow}>
      <CustomerDetailView
        mode={CrudMode.VIEW}
        formData={initialData}
      />
    </ViewLayout>
  );
};
