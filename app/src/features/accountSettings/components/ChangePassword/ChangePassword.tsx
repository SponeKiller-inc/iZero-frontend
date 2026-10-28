import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChangePasswordDialog from './ChangePasswordDialog';
import getJwtTokenData, { AUTH_PROVIDER } from '@/utils/getJwtTokenData';

import sharedStyles from '../shared.module.css';

const ChangePassword = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Only accounts with a password (local or seed) can change it
  const provider = getJwtTokenData()?.provider;
  if (provider !== AUTH_PROVIDER.local && provider !== AUTH_PROVIDER.seed) {
    return null;
  }

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        { t('changePassword.title') }
      </h2>
      <p>{ t('changePassword.description') }</p>
      <button
        type="button"
        className={sharedStyles.primaryBtn}
        onClick={openDialog}
      >
        { t('changePassword.action') }
      </button>

      {isDialogOpen && (
        <ChangePasswordDialog onClose={closeDialog} />
      )}
    </section>
  );
};

export default ChangePassword;
