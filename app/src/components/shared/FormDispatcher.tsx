import { useMatches, UIMatch } from 'react-router-dom';
import { pascalCase } from "change-case";

import { CrudModeType } from '@/types/crud';

import { EditCustomer } from '@/features/catalog/customer/ts/EditCustomer';

const FORM_MATRIX: Record<string, Record<CrudModeType, React.FC<any>>> = {
  Customer: {
    //create: AddCustomer,
    edit: EditCustomer,
    //view: ViewCustomer,
    //delete: DeleteCustomer
  },
}

interface EntityFormLoaderProps {
  crudMode: CrudModeType;
}

type MatchEntityType = UIMatch<unknown, {entityType: string}>;

export const EntityFormLoader: React.FC<EntityFormLoaderProps> = ( { crudMode } ) => {
  const matches = useMatches() as MatchEntityType[];

  const entityType = [...matches].reverse().find(m => m.handle?.entityType);

  if (!entityType) return null;

  const Component = pascalCase(crudMode + ' ' + entityType)

  return <Component />;
};