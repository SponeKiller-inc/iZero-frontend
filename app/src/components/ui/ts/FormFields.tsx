import { ChangeEvent, FocusEvent, ReactNode, useId } from 'react';

import styles from '../css/FormFields.module.css';

type FieldProps = {
  name: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
};

const FieldFrame = ({ inputId, label, error, required, children }: {
  inputId: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <div className={styles.field}>
    <label htmlFor={inputId}>
      { label }{ required && ' *' }
    </label>
    { children }
    {error && (
      <p className={styles.fieldError}>
        { error }
      </p>
    )}
  </div>
);

/**
 * Text field with a label and an error
 * @param name - name of the field in the form
 * @param label - translated label of the field
 * @param value - current value of the field
 * @param error - translated error, the field is marked invalid while set
 * @param required - true marks the field as required in its label
 * @param type - type of the input
 * @param readOnly - true prevents the user from changing the value
 * @param list - ID of a datalist with suggested values
 * @param inputMode - keyboard offered on touch devices
 * @param onChange - called when the value changes
 * @param onBlur - called when the field loses focus
 */
export const TextField = ({
  name, label, value, error, required, type = 'text', readOnly, list, inputMode, onChange, onBlur,
}: FieldProps & {
  type?: 'text' | 'date' | 'email' | 'tel';
  readOnly?: boolean;
  list?: string;
  inputMode?: 'numeric';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}) => {
  const inputId = useId();

  return (
    <FieldFrame inputId={inputId} label={label} error={error} required={required}>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        list={list}
        inputMode={inputMode}
        className={error ? styles.invalid : undefined}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FieldFrame>
  );
};

/**
 * Select field with a label and an error
 * @param name - name of the field in the form
 * @param label - translated label of the field
 * @param value - current value of the field
 * @param error - translated error, the field is marked invalid while set
 * @param required - true marks the field as required in its label
 * @param children - options of the select
 * @param onChange - called when the value changes
 * @param onBlur - called when the field loses focus
 */
export const SelectField = ({ name, label, value, error, required, children, onChange, onBlur }: FieldProps & {
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
}) => {
  const inputId = useId();

  return (
    <FieldFrame inputId={inputId} label={label} error={error} required={required}>
      <select
        id={inputId}
        name={name}
        value={value}
        className={error ? styles.invalid : undefined}
        onChange={onChange}
        onBlur={onBlur}
      >
        { children }
      </select>
    </FieldFrame>
  );
};
