import { CrudMode } from '@/constants/crud';
import { CrudModeType } from '@/types/crud';

import styles from '../css/Field.module.css';

interface FieldProps {
  label: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  length?: "small" | "medium" | "large";
  mode: CrudModeType;
}

export const Field: React.FC<FieldProps> = ({ 
  label, 
  value, 
  onChange, 
  name, 
  mode,
  type = "text", 
  length = "small",
}) => {
  const isEditable = mode === CrudMode.EDIT;
  const isDeleteMode = mode === CrudMode.DELETE;

  return (
    <div className={styles.col}>
      <label className={styles.label}>{label}</label>
      <input 
        className={`${styles.input} ${!isEditable ? styles.inputReadOnly : ''} ${styles[length]}`}
        type={type}
        name={name}
        value={value || ''}
        onChange={isEditable ? onChange : undefined}
        readOnly={!isEditable}
        disabled={isDeleteMode} 
        size={50}
      />
    </div>
  );
};