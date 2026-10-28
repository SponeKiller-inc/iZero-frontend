import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import DeleteAccountDialog from './DeleteAccountDialog';
import useDeleteAccount from './hooks/useDeleteAccount';

import sharedStyles from '../shared.module.css';

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
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        { t('deleteAccount.title') }
      </h2>
      <p>{ t('deleteAccount.description') }</p>
      <button
        type="button"
        className={sharedStyles.dangerBtn}
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
