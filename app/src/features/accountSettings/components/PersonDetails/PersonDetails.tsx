import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PersonDetailsDialog from './PersonDetailsDialog';

import sharedStyles from '../shared.module.css';

const PersonDetails = () => {
  const { t } = useTranslation('pages/AccountSettings');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        { t('personDetails.title') }
      </h2>
      <p>{ t('personDetails.description') }</p>
      <button
        type="button"
        className={sharedStyles.primaryBtn}
        onClick={openDialog}
      >
        { t('details.view') }
      </button>

      {isDialogOpen && (
        <PersonDetailsDialog onClose={closeDialog} />
      )}
    </section>
  );
};

export default PersonDetails;
