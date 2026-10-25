import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import DeleteAccountDialog from './DeleteAccountDialog';
import useDeleteAccount from './hooks/useDeleteAccount';

import styles from './DeleteAccount.module.css';

const DeleteAccount = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const { status, deleteAccount, reset } = useDeleteAccount();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    reset();
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        { t('deleteAccount.title') }
      </h2>
      <p>{ t('deleteAccount.description') }</p>
      <button
        type="button"
        className={styles.dangerBtn}
        onClick={openDialog}
      >
        { t('deleteAccount.action') }
      </button>

      <DeleteAccountDialog
        open={isDialogOpen}
        status={status}
        onConfirm={deleteAccount}
        onClose={closeDialog}
      />
    </section>
  );
};

export default DeleteAccount;
