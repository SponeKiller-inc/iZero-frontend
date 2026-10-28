import validatePassword from '@/utils/validatePassword';
import { FieldErrors, PasswordForm } from './types';

/**
 * Checks all fields of the change password form before sending
 * @returns error per field, undefined for a valid field
 */
export const validatePasswordForm = (form: PasswordForm): FieldErrors => ({
  currentPassword: validatePassword('current', form.currentPassword),
  newPassword: validatePassword('new', form.newPassword, {
    currentPassword: form.currentPassword,
  }),
  passwordConfirmation: validatePassword('confirmation', form.passwordConfirmation, {
    newPassword: form.newPassword,
  }),
});
