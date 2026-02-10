import { ChangeEvent} from 'react';
import { CrudMode } from '@/constants/crud';

export type CrudModeType = typeof CrudMode[keyof typeof CrudMode];

export interface DetailViewProps {
  mode: CrudModeType;
  formData: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ViewState {
  setShowView: (state: boolean) => void;
}

export interface EditState {
  setShowEdit: (state: boolean) => void;
}

export interface DeleteState {
  setShowDelete: (state: boolean) => void;
}

export interface AddState {
  setShowAdd: (state: boolean) => void;
}
