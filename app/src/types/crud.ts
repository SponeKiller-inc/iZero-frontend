import { ChangeEvent, MouseEvent} from 'react';
import { CrudMode } from '@/constants/crud';

export type CrudModeType = typeof CrudMode[keyof typeof CrudMode];

export interface DetailViewProps<T> {
  mode: CrudModeType;
  formData: T;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CrudHandler<T> {
  (data: T, setItems: (items: T[]) => void): {
    formData: T;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  };
}

export interface CrudItem {
  [key: string]: string;
}

export interface CrudState {
  onView: (data: CrudItem) => void;
  onEdit: (data: CrudItem) => void;
  onDelete: (data: CrudItem) => void;
  onAdd: () => void;
}