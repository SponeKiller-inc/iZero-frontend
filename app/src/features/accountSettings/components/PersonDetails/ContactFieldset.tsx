import { useTranslation } from 'react-i18next';

import { SelectField, TextField } from '@/components/ui/ts/FormFields';
import { PhonePrefix } from '@/types/person';
import { ContactFields, FieldControls } from './types';
import styles from './ContactFieldset.module.css';

/**
 * Phone and e-mail of any person type
 * @param fieldPrefix - prefix of the field names, identifies the owner of the fields
 * @param values - current values of the fields
 * @param phonePrefixes - catalogue of phone prefixes
 * @param controls - errors and event handlers of the fields
 */
const ContactFieldset = ({ fieldPrefix = '', values, phonePrefixes, controls }: {
  fieldPrefix?: string;
  values: ContactFields;
  phonePrefixes: PhonePrefix[];
  controls: FieldControls;
}) => {
  const { t } = useTranslation('pages/AccountSettings');

  return (
    <>
      <div className={styles.phone}>
        <SelectField
          name={`${fieldPrefix}phonePrefixId`}
          label={t('personDetails.fields.phonePrefix')}
          value={values.phonePrefixId}
          error={controls.errors[`${fieldPrefix}phonePrefixId`]}
          required={Boolean(values.phoneNumber.trim())}
          onChange={controls.onChange}
          onBlur={controls.onBlur}
        >
          <option value="">–</option>
          {phonePrefixes.map(({ id, prefix }) => (
            <option key={id} value={id}>+{ prefix }</option>
          ))}
        </SelectField>
        <TextField
          name={`${fieldPrefix}phoneNumber`}
          label={t('personDetails.fields.phone')}
          type="tel"
          value={values.phoneNumber}
          error={controls.errors[`${fieldPrefix}phoneNumber`]}
          required={Boolean(values.phonePrefixId)}
          onChange={controls.onChange}
          onBlur={controls.onBlur}
        />
      </div>
      <TextField
        name={`${fieldPrefix}email`}
        label={t('personDetails.fields.email')}
        type="email"
        value={values.email}
        error={controls.errors[`${fieldPrefix}email`]}
        onChange={controls.onChange}
        onBlur={controls.onBlur}
      />
    </>
  );
};

export default ContactFieldset;
