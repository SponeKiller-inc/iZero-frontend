import { useTranslation } from 'react-i18next';

import { TextField } from '@/components/ui/ts/FormFields';
import { PersonType } from '@/types/person';
import DetailsDialog from '../DetailsDialog';
import LoadFailed from '../LoadFailed';
import CompanyFieldset from './CompanyFieldset';
import EntrepreneurFieldset from './EntrepreneurFieldset';
import NaturalPersonFieldset from './NaturalPersonFieldset';
import PersonDetailsView from './PersonDetailsView';
import usePersonDetails from './hooks/usePersonDetails';
import { FieldControls } from './types';
import sharedStyles from '../shared.module.css';

const PERSON_TYPES: PersonType[] = ['natural_person', 'entrepreneur', 'company'];

const PersonDetailsDialog = ({ onClose }: {
  onClose: () => void;
}) => {
  const { t } = useTranslation('pages/AccountSettings');
  const {
    person,
    catalogues,
    form,
    fieldErrors,
    saveStatus,
    isSaving,
    isAdding,
    isFormOpen,
    canSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    startEdit,
    cancelEdit,
  } = usePersonDetails();

  const hasFormError = saveStatus !== 'idle' && saveStatus !== 'saving';

  const controls: FieldControls = {
    errors: fieldErrors,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  const getTitle = () => {
    if (isAdding) {
      return t('personDetails.addTitle');
    }
    return isFormOpen ? t('personDetails.editTitle') : t('personDetails.title');
  };

  const renderContent = () => {
    if (person.status === 'loading') {
      return <p>{ t('details.loading') }</p>;
    }

    if (person.status === 'error') {
      return <LoadFailed message={t('details.loadError')} onRetry={person.retry} onCancel={onClose} />;
    }

    if (!isFormOpen && person.data) {
      return (
        <>
          <PersonDetailsView person={person.data} />
          <div className={sharedStyles.actions}>
            <button type="button" className={sharedStyles.secondaryBtn} onClick={onClose}>
              { t('details.cancel') }
            </button>
            <button type="button" className={sharedStyles.primaryBtn} onClick={startEdit}>
              { t('details.edit') }
            </button>
          </div>
        </>
      );
    }

    if (catalogues.status === 'loading') {
      return <p>{ t('details.loading') }</p>;
    }

    if (catalogues.status === 'error' || !catalogues.data) {
      return (
        <LoadFailed
          message={t('personDetails.catalogueError')}
          onRetry={catalogues.retry}
          onCancel={isAdding ? onClose : cancelEdit}
        />
      );
    }

    const { titles, legalForms, phonePrefixes } = catalogues.data;

    return (
      <form className={sharedStyles.form} onSubmit={handleSubmit} noValidate>
        {hasFormError && (
          <p className={sharedStyles.error}>
            { t(`personDetails.errors.${saveStatus}`) }
          </p>
        )}

        <fieldset className={sharedStyles.fieldset} disabled={isSaving}>
          {isAdding ? (
            <fieldset className={sharedStyles.choices}>
              <legend>{ t('personDetails.fields.personType') } *</legend>
              {PERSON_TYPES.map((personType) => (
                <label key={personType} className={sharedStyles.check}>
                  <input
                    type="radio"
                    name="personType"
                    value={personType}
                    checked={form.personType === personType}
                    onChange={handleChange}
                  />
                  { t(`personDetails.types.${personType}`) }
                </label>
              ))}
            </fieldset>
          ) : (
            <TextField
              name="personType"
              label={t('personDetails.fields.personType')}
              value={form.personType && t(`personDetails.types.${form.personType}`)}
              readOnly
            />
          )}

          {form.personType === 'natural_person' && (
            <NaturalPersonFieldset
              values={form}
              titles={titles}
              phonePrefixes={phonePrefixes}
              controls={controls}
              onTitlesChange={setFieldValue}
            />
          )}

          {form.personType === 'entrepreneur' && (
            <EntrepreneurFieldset
              values={form}
              phonePrefixes={phonePrefixes}
              controls={controls}
            />
          )}

          {form.personType === 'company' && (
            <CompanyFieldset
              values={form}
              legalForms={legalForms}
              titles={titles}
              phonePrefixes={phonePrefixes}
              controls={controls}
              onTitlesChange={setFieldValue}
            />
          )}
        </fieldset>

        <div className={sharedStyles.actions}>
          <button
            type="button"
            className={sharedStyles.secondaryBtn}
            onClick={isAdding ? onClose : cancelEdit}
            disabled={isSaving}
          >
            { t('details.cancel') }
          </button>
          <button type="submit" className={sharedStyles.primaryBtn} disabled={!canSubmit}>
            { isSaving ? t('details.saving') : t('details.save') }
          </button>
        </div>
      </form>
    );
  };

  return (
    <DetailsDialog title={getTitle()} isBusy={isSaving} onClose={onClose}>
      { renderContent() }
    </DetailsDialog>
  );
};

export default PersonDetailsDialog;
