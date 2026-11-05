import { useTranslation } from 'react-i18next';

import { SelectField, TextField } from '@/components/ui/ts/FormFields';
import { LegalForm, PhonePrefix, Title } from '@/types/person';
import ContactFieldset from './ContactFieldset';
import NaturalPersonFieldset from './NaturalPersonFieldset';
import { FieldControls, PersonForm } from './types';
import sharedStyles from '../shared.module.css';
import styles from './CompanyFieldset.module.css';

/**
 * Fields of a company together with its representative
 * @param values - current values of the form
 * @param legalForms - catalogue of legal forms
 * @param titles - catalogue of titles
 * @param phonePrefixes - catalogue of phone prefixes
 * @param controls - errors and event handlers of the fields
 * @param onTitlesChange - called with the field name and the newly chosen titles of the representative
 */
const CompanyFieldset = ({ values, legalForms, titles, phonePrefixes, controls, onTitlesChange }: {
  values: PersonForm;
  legalForms: LegalForm[];
  titles: Title[];
  phonePrefixes: PhonePrefix[];
  controls: FieldControls;
  onTitlesChange: (fieldName: string, titleNames: string[]) => void;
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
      <SelectField
        name="legalFormId"
        label={t('personDetails.fields.legalForm')}
        value={values.legalFormId}
        error={controls.errors.legalFormId}
        required
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      >
        <option value="">{ t('personDetails.errors.legalForm') }</option>
        {legalForms.map(({ id, code, name }) => (
          <option key={id} value={id}>{ code } – { name }</option>
        ))}
      </SelectField>
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
      <fieldset className={styles.group}>
        <legend>{ t('personDetails.fields.representative') }</legend>
        <NaturalPersonFieldset
          fieldPrefix="representative."
          values={values.representative}
          titles={titles}
          phonePrefixes={phonePrefixes}
          controls={controls}
          onTitlesChange={onTitlesChange}
        />
      </fieldset>
    </>
  );
};

export default CompanyFieldset;
