import { ChangeEvent} from 'react';
import { CrudMode } from '@/constants/crud';

export type CrudModeType = typeof CrudMode[keyof typeof CrudMode];

export interface DetailViewProps {
  mode: CrudModeType;
  formData: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}