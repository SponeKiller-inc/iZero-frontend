import { useEffect, useRef, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { PasswordInput } from '@/components/ui/ts/PasswordInput';
import useChangePassword from './hooks/useChangePassword';
import sharedStyles from '../shared.module.css';
import styles from './ChangePasswordDialog.module.css';

/**
 * Mounted only while open, so entered passwords and visibility toggles
 * are discarded on every close
 */
const ChangePasswordDialog = ({ onClose }: {
  onClose: () => void;
}) => {
  const { t } = useTranslation('pages/AccountSettings');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const {
    form,
    fieldErrors,
    status,
    canSubmit,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useChangePassword();

  const isProcessing = status === 'processing';
  const hasFormError = status === 'wrongCurrent' || status === 'generic';

  useEffect(() => {
    dialogRef.current?.showModal();
    currentPasswordRef.current?.focus();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      onClose();
    } else if (status === 'wrongCurrent') {
      currentPasswordRef.current?.focus();
    }
  }, [status, onClose]);

  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={sharedStyles.dialog}
      onCancel={handleCancel}
    >
      <h2 className={sharedStyles.dialogTitle}>
        { t('changePassword.dialog.title') }
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset className={styles.fieldset} disabled={isProcessing}>
          <PasswordInput
            ref={currentPasswordRef}
            name="currentPassword"
            label={t('changePassword.dialog.currentPassword')}
            value={form.currentPassword}
            error={fieldErrors.currentPassword && t(`changePassword.errors.${fieldErrors.currentPassword}`)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <PasswordInput
            name="newPassword"
            label={t('changePassword.dialog.newPassword')}
            value={form.newPassword}
            error={fieldErrors.newPassword && t(`changePassword.errors.${fieldErrors.newPassword}`)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className={styles.rules}>
            { t('changePassword.dialog.rules') }
          </p>
          <PasswordInput
            name="passwordConfirmation"
            label={t('changePassword.dialog.passwordConfirmation')}
            value={form.passwordConfirmation}
            error={fieldErrors.passwordConfirmation && t(`changePassword.errors.${fieldErrors.passwordConfirmation}`)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </fieldset>

        {hasFormError && (
          <p className={sharedStyles.error}>
            { t(`changePassword.errors.${status}`) }
          </p>
        )}

        <div className={sharedStyles.actions}>
          <button
            type="button"
            className={sharedStyles.secondaryBtn}
            onClick={onClose}
            disabled={isProcessing}
          >
            { t('changePassword.dialog.cancel') }
          </button>
          <button
            type="submit"
            className={sharedStyles.primaryBtn}
            disabled={!canSubmit}
          >
            { isProcessing ? t('changePassword.dialog.processing') : t('changePassword.dialog.confirm') }
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ChangePasswordDialog;
