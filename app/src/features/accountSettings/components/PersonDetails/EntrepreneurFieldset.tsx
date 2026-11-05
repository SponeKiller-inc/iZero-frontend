import { useTranslation } from 'react-i18next';

import { TextField } from '@/components/ui/ts/FormFields';
import { PhonePrefix } from '@/types/person';
import ContactFieldset from './ContactFieldset';
import { FieldControls, PersonForm } from './types';
import sharedStyles from '../shared.module.css';

/**
 * Fields of an entrepreneur
 * @param values - current values of the form
 * @param phonePrefixes - catalogue of phone prefixes
 * @param controls - errors and event handlers of the fields
 */
const EntrepreneurFieldset = ({ values, phonePrefixes, controls }: {
  values: PersonForm;
  phonePrefixes: PhonePrefix[];
  controls: FieldControls;
}) => {
  const { t } = useTranslation('pages/AccountSettings');

  return (
    <>
      <TextField
        name="name"
        label={t('personDetails.fields.name')}
        value={values.name}
        error={controls.errors.name}
        required
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
      <TextField
        name="registrationNumber"
        label={t('personDetails.fields.registrationNumber')}
        value={values.registrationNumber}
        inputMode="numeric"
        error={controls.errors.registrationNumber}
        required
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
      <TextField
        name="vatNumber"
        label={t('personDetails.fields.vatNumber')}
        value={values.vatNumber}
        error={controls.errors.vatNumber}
        required={values.isVatPayer}
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
      <label className={sharedStyles.check}>
        <input
          type="checkbox"
          name="isVatPayer"
          checked={values.isVatPayer}
          onChange={controls.onChange}
        />
        { t('personDetails.fields.isVatPayer') }
      </label>
      <ContactFieldset
        values={values}
        phonePrefixes={phonePrefixes}
        controls={controls}
      />
    </>
  );
};

export default EntrepreneurFieldset;
