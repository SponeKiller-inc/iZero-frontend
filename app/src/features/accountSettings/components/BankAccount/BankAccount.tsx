import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BankAccountDialog from './BankAccountDialog';

import sharedStyles from '../shared.module.css';

const BankAccount = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        { t('bankAccount.title') }
      </h2>
      <p>{ t('bankAccount.description') }</p>
      <button
        type="button"
        className={sharedStyles.primaryBtn}
        onClick={openDialog}
      >
        { t('details.view') }
      </button>

      {isDialogOpen && (
        <BankAccountDialog onClose={closeDialog} />
      )}
    </section>
  );
};

export default BankAccount;
