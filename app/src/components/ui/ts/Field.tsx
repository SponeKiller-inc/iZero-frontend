import { CrudMode } from '@/constants/crud';
import { CrudModeType } from '@/types/crud';

import styles from './Field.module.css';

interface FieldProps {
  label: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  mode: CrudModeType;
}

export const Field: React.FC<FieldProps> = ({ 
  label, 
  value, 
  onChange, 
  name, 
  type = "text", 
  mode 
}) => {
  const isEditable = mode === CrudMode.EDIT;
  const isDeleteMode = mode === CrudMode.DELETE;

  return (
    <div className={styles.col}>
      <label className={styles.label}>{label}</label>
      <input 
        className={`${styles.input} ${!isEditable ? styles.inputReadOnly : ''}`}
        type={type}
        name={name}
        value={value || ''}
        onChange={isEditable ? onChange : undefined}
        readOnly={!isEditable}
        disabled={isDeleteMode} 
      />
    </div>
  );
};