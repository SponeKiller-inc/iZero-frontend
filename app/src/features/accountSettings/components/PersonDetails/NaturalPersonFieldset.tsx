import { useTranslation } from 'react-i18next';

import { TextField } from '@/components/ui/ts/FormFields';
import { PhonePrefix, Title } from '@/types/person';
import ContactFieldset from './ContactFieldset';
import { FieldControls, NaturalPersonFields } from './types';
import sharedStyles from '../shared.module.css';
import styles from './NaturalPersonFieldset.module.css';

/**
 * Fields of a natural person, also used for the representative of a company
 * @param fieldPrefix - prefix of the field names, identifies the owner of the fields
 * @param values - current values of the fields
 * @param titles - catalogue of titles
 * @param phonePrefixes - catalogue of phone prefixes
 * @param controls - errors and event handlers of the fields
 * @param onTitlesChange - called with the field name and the newly chosen titles
 */
const NaturalPersonFieldset = ({
  fieldPrefix = '', values, titles, phonePrefixes, controls, onTitlesChange,
}: {
  fieldPrefix?: string;
  values: NaturalPersonFields;
  titles: Title[];
  phonePrefixes: PhonePrefix[];
  controls: FieldControls;
  onTitlesChange: (fieldName: string, titleNames: string[]) => void;
}) => {
  const { t } = useTranslation('pages/AccountSettings');

  const toggleTitle = (titleName: string, isChecked: boolean) => {
    onTitlesChange(
      `${fieldPrefix}titleNames`,
      isChecked ? [...values.titleNames, titleName] : values.titleNames.filter((name) => name !== titleName),
    );
  };

  return (
    <>
      <TextField
        name={`${fieldPrefix}firstName`}
        label={t('personDetails.fields.firstName')}
        value={values.firstName}
        error={controls.errors[`${fieldPrefix}firstName`]}
        required
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
      <TextField
        name={`${fieldPrefix}lastName`}
        label={t('personDetails.fields.lastName')}
        value={values.lastName}
        error={controls.errors[`${fieldPrefix}lastName`]}
        required
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
      <TextField
        name={`${fieldPrefix}dateOfBirth`}
        label={t('personDetails.fields.dateOfBirth')}
        type="date"
        value={values.dateOfBirth}
        error={controls.errors[`${fieldPrefix}dateOfBirth`]}
        required
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
      <fieldset className={`${sharedStyles.choices} ${styles.scrollable}`}>
        <legend>{ t('personDetails.fields.title') }</legend>
        {titles.map(({ id, name }) => (
          <label key={id} className={sharedStyles.check}>
            <input
              type="checkbox"
              checked={values.titleNames.includes(name)}
              onChange={(e) => toggleTitle(name, e.target.checked)}
            />
            { name }
          </label>
        ))}
      </fieldset>
      <ContactFieldset
        fieldPrefix={fieldPrefix}
        values={values}
        phonePrefixes={phonePrefixes}
        controls={controls}
      />
    </>
  );
};

export default NaturalPersonFieldset;
