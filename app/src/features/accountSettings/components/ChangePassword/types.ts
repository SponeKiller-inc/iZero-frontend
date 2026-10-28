import { PasswordError } from '@/utils/validatePassword';

export type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type PasswordFieldName = keyof PasswordForm;

export type FieldErrors = Partial<Record<PasswordFieldName, PasswordError>>;

export type ChangeStatus = 'idle' | 'processing' | 'success' | 'wrongCurrent' | 'generic';
