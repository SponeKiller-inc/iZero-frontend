import { ReactNode, SyntheticEvent, useEffect, useRef } from 'react';

import sharedStyles from './shared.module.css';

/**
 * Modal dialog of a details section
 * Mounted only while open, so unsaved changes are discarded on every close
 * @param title - translated title of the dialog
 * @param isBusy - true blocks closing with the Escape key
 * @param onClose - called when the dialog should close
 * @param children - content of the dialog
 */
const DetailsDialog = ({ title, isBusy, onClose, children }: {
  title: string;
  isBusy: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    if (!isBusy) {
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
        { title }
      </h2>
      { children }
    </dialog>
  );
};

export default DetailsDialog;
