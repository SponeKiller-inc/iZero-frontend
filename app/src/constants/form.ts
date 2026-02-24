import { EditCustomer } from '@/features/catalog/customer/ts/EditCustomer';
import { AddCustomer } from '@/features/catalog/customer/ts/AddCustomer';
import { ViewCustomer } from '@/features/catalog/customer/ts/ViewCustomer';
import { DeleteCustomer } from '@/features/catalog/customer/ts/DeleteCustomer';
import { CrudModeType } from '@/types/crud';

export const FORM_MATRIX: Record<string, Record<CrudModeType, React.FC<any>>> = {
  customer: {
    add: AddCustomer,
    edit: EditCustomer,
    view: ViewCustomer,
    delete: DeleteCustomer
  },
}
