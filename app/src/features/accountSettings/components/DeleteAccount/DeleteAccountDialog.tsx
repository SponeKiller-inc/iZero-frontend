import { useEffect, useRef, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteStatus } from './types';
import styles from './DeleteAccountDialog.module.css';

const DeleteAccountDialog = ({ open, status, onConfirm, onClose }: {
  open: boolean;
  status: DeleteStatus;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  const { t } = useTranslation('pages/AccountSettings');
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isProcessing = status === 'processing';
  const isFinished = status === 'adminAccount' || status === 'unknown';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleCancel}
    >
      <h2 className={styles.dialogTitle}>
        { t('deleteAccount.dialog.title') }
      </h2>
      <p>
        { t('deleteAccount.dialog.consequences') }
      </p>

      {isFinished && (
        <p className={styles.error}>
          { t(`deleteAccount.dialog.${status}`) }
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={onClose}
          disabled={isProcessing}
        >
          { isFinished ? t('deleteAccount.dialog.close') : t('deleteAccount.dialog.cancel') }
        </button>
        {!isFinished && (
          <button
            type="button"
            className={styles.dangerBtn}
            onClick={onConfirm}
            disabled={isProcessing}
          >
            { isProcessing ? t('deleteAccount.dialog.processing') : t('deleteAccount.dialog.confirm') }
          </button>
        )}
      </div>
    </dialog>
  );
};

export default DeleteAccountDialog;
