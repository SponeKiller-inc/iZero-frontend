import { ChangeEvent, FocusEvent, Ref, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import styles from '../css/PasswordInput.module.css';

/**
 * Password field with a toggle to show the typed password
 * @param label - translated label of the field
 * @param error - translated error, the field is marked invalid while set
 */
export const PasswordInput = ({ name, label, value, error, placeholder, ref, onChange, onBlur }: {
  name: string;
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}) => {
  // Hidden by default, again on every mount
  const [isVisible, setIsVisible] = useState(false);
  const inputId = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={inputId}>
        { label }
      </label>
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          className={error ? styles.inputInvalid : undefined}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          { isVisible ? <EyeOff size={18} /> : <Eye size={18} /> }
        </button>
      </div>
      {error && (
        <p className={styles.fieldError}>
          { error }
        </p>
      )}
    </div>
  );
};
