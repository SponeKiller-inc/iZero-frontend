import { useMatches, UIMatch } from 'react-router-dom';

import { CrudModeType, CrudItem } from '@/types/crud';
import { FORM_MATRIX } from '@/constants/form';

interface EntityFormLoaderProps {
  crudMode: CrudModeType;
  setShow: (state: boolean) => void
  setItems: (items: CrudItem[]) => void;
  initialData: CrudItem | null;
}

type MatchEntityType = UIMatch<unknown, {entityType: string}>;

export const FormDispatcher: React.FC<EntityFormLoaderProps> = ( { crudMode, setShow, setItems, initialData } ) => {
  const matches = useMatches() as MatchEntityType[];

  const match = [...matches].reverse().find(m => m.handle?.entityType);
  const entityType = match?.handle?.entityType;

  if (!entityType) return null;

  const Component = FORM_MATRIX[entityType][crudMode];

  return <Component setShow={setShow} setItems={setItems} initialData={initialData} />;
};