import { ChangeEvent, FocusEvent, FormEvent, useContext, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { UserService } from '@/services/UserService';
import { UserContext } from '@/context/UserContext';
import getAxiosStatus from '@/utils/getAxiosStatus';
import { validatePasswordForm } from '../validation';
import { ChangeStatus, FieldErrors, PasswordFieldName, PasswordForm } from '../types';

const EMPTY_FORM: PasswordForm = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

const useChangePassword = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const userService = useMemo(() => new UserService(), []);
  const { userID } = useContext(UserContext);
  const [form, setForm] = useState<PasswordForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<PasswordFieldName, boolean>>>({});
  const [status, setStatus] = useState<ChangeStatus>('idle');
 
  const isSubmitting = useRef(false);

  const clientErrors = validatePasswordForm(form);
  const canSubmit = Object.values(clientErrors).every((error) => !error) && status !== 'processing';

  const fieldErrors: FieldErrors = {};
  (Object.keys(clientErrors) as PasswordFieldName[]).forEach((field) => {
    if (touched[field] && form[field] !== '') {
      fieldErrors[field] = clientErrors[field];
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as PasswordFieldName;
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as PasswordFieldName;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting.current || !canSubmit) {
      return;
    }

    isSubmitting.current = true;
    setStatus('processing');

    try {
      await userService.changePassword(userID, form);
    } catch (error: unknown) {
      switch (getAxiosStatus(error)) {
        case 400:
          // Password rules are checked before sending, so 400 means wrong current password
          setForm(EMPTY_FORM);
          setTouched({});
          setStatus('wrongCurrent');
          break;
        default:
          // Google account (409), network failure or unknown error - the outcome may be unknown
          setStatus('generic');
          break;
      }

      isSubmitting.current = false;
      return;
    }

    // Passwords must not stay in memory after success
    setForm(EMPTY_FORM);
    isSubmitting.current = false;
    setStatus('success');
    toast.success(t('changePassword.success'));
  };

  return { form, fieldErrors, status, canSubmit, handleChange, handleBlur, handleSubmit };
};

export default useChangePassword;
