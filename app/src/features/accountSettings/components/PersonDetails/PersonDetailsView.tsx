import { useTranslation } from 'react-i18next';

import { CompanyOutput, EntrepreneurOutput, NaturalPersonOutput, UserPersonOutput } from '@/types/person';
import DetailsList from '../DetailsList';
import styles from './PersonDetailsView.module.css';

/**
 * Read-only stored person details of the given type
 * @param person - stored person details
 */
const PersonDetailsView = ({ person }: {
  person: UserPersonOutput;
}) => {
  const { t, i18n } = useTranslation('pages/AccountSettings');
  const { t: tCommon } = useTranslation('common');

  const contactRows = (details: {
    phonePrefix: string | null;
    phoneNumber: string | null;
    email: string | null;
  }) => [
    {
      label: t('personDetails.fields.phone'),
      value: details.phoneNumber && `+${details.phonePrefix} ${details.phoneNumber}`,
    },
    { label: t('personDetails.fields.email'), value: details.email },
  ];

  const naturalPersonRows = (details: NaturalPersonOutput) => [
    {
      label: t('personDetails.fields.title'),
      value: [...details.prefixTitles, ...details.suffixTitles].join(', '),
    },
    { label: t('personDetails.fields.firstName'), value: details.firstName },
    { label: t('personDetails.fields.lastName'), value: details.lastName },
    {
      label: t('personDetails.fields.dateOfBirth'),
      value: new Date(`${details.dateOfBirth}T00:00:00`).toLocaleDateString(i18n.language),
    },
    ...contactRows(details),
  ];

  const entrepreneurRows = (details: EntrepreneurOutput) => [
    { label: t('personDetails.fields.name'), value: details.name },
    { label: t('personDetails.fields.registrationNumber'), value: details.registrationNumber },
    { label: t('personDetails.fields.vatNumber'), value: details.vatNumber },
    { label: t('personDetails.fields.isVatPayer'), value: details.isVatPayer ? tCommon('yes') : tCommon('no') },
    ...contactRows(details),
  ];

  const companyRows = (details: CompanyOutput) => [
    { label: t('personDetails.fields.name'), value: details.name },
    { label: t('personDetails.fields.legalForm'), value: details.legalForm },
    { label: t('personDetails.fields.registrationNumber'), value: details.registrationNumber },
    { label: t('personDetails.fields.vatNumber'), value: details.vatNumber },
    { label: t('personDetails.fields.isVatPayer'), value: details.isVatPayer ? tCommon('yes') : tCommon('no') },
    ...contactRows(details),
  ];

  const typeRow = {
    label: t('personDetails.fields.personType'),
    value: t(`personDetails.types.${person.personType}`),
  };

  const { naturalPerson, entrepreneur, company } = person;

  return (
    <>
      {naturalPerson && (
        <DetailsList rows={[typeRow, ...naturalPersonRows(naturalPerson)]} />
      )}
      {entrepreneur && (
        <DetailsList rows={[typeRow, ...entrepreneurRows(entrepreneur)]} />
      )}
      {company && (
        <>
          <DetailsList rows={[typeRow, ...companyRows(company)]} />
          <h3 className={styles.subtitle}>{ t('personDetails.fields.representative') }</h3>
          <DetailsList rows={naturalPersonRows(company.representative)} />
        </>
      )}
    </>
  );
};

export default PersonDetailsView;
