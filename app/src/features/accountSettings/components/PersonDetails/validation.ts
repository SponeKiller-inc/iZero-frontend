import { ContactFields, FieldErrors, NaturalPersonFields, PersonError, PersonForm } from './types';

const MIN_AGE = 18;
const EMAIL_MAX_LENGTH = 254;

const validateRequired = (value: string): PersonError | undefined => (
  value.trim() ? undefined : 'required'
);

/**
 * Number of whole years from the date of birth; 29 February counts as
 * reached on 1 March in non-leap years, same as on the server
 * @param dateOfBirth - date of birth in the YYYY-MM-DD format
 * @param today - date the age is calculated for
 */
const getAge = (dateOfBirth: string, today: Date): number => {
  const [year, month, day] = dateOfBirth.split('-').map(Number);
  const hadBirthdayThisYear = today.getMonth() + 1 > month
    || (today.getMonth() + 1 === month && today.getDate() >= day);

  return today.getFullYear() - year - (hadBirthdayThisYear ? 0 : 1);
};

const validateDateOfBirth = (dateOfBirth: string, today: Date): PersonError | undefined => {
  if (!dateOfBirth) {
    return 'required';
  }
  if (Number.isNaN(Date.parse(dateOfBirth)) || new Date(`${dateOfBirth}T00:00:00`) > today) {
    return 'dateOfBirth';
  }
  return getAge(dateOfBirth, today) < MIN_AGE ? 'age' : undefined;
};

/**
 * 8 digits, the last one is a mod 11 check digit
 * @param registrationNumber - company ID as entered by the user
 */
const validateRegistrationNumber = (registrationNumber: string): PersonError | undefined => {
  const value = registrationNumber.trim();

  if (!value) {
    return 'required';
  }
  if (!/^\d{8}$/.test(value)) {
    return 'registrationLength';
  }

  const weightedSum = [...value.slice(0, 7)].reduce((sum, digit, i) => sum + Number(digit) * (8 - i), 0);
  const checkDigit = (11 - weightedSum % 11) % 10;

  return checkDigit === Number(value[7]) ? undefined : 'registrationCheckDigit';
};

const validateVatNumber = (vatNumber: string, isVatPayer: boolean): PersonError | undefined => {
  const value = vatNumber.trim();

  if (!value) {
    return isVatPayer ? 'vatPayer' : undefined;
  }
  return /^CZ\d{8,10}$/.test(value) ? undefined : 'vatNumber';
};

/**
 * The server accepts the phone prefix and the number only together
 * @param phoneNumber - trimmed phone number
 * @param phonePrefixId - chosen phone prefix, empty if none is chosen
 */
const validatePhoneNumber = (phoneNumber: string, phonePrefixId: string): PersonError | undefined => {
  if (!phoneNumber) {
    return phonePrefixId ? 'required' : undefined;
  }
  return /^\d{9}$/.test(phoneNumber) ? undefined : 'phone';
};

const validateContact = (fields: ContactFields, fieldPrefix: string): FieldErrors => {
  const phoneNumber = fields.phoneNumber.trim();
  const email = fields.email.trim();

  return {
    [`${fieldPrefix}phonePrefixId`]: phoneNumber && !fields.phonePrefixId ? 'required' : undefined,
    [`${fieldPrefix}phoneNumber`]: validatePhoneNumber(phoneNumber, fields.phonePrefixId),
    [`${fieldPrefix}email`]: email && (email.length > EMAIL_MAX_LENGTH || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      ? 'email'
      : undefined,
  };
};

const validateNaturalPerson = (fields: NaturalPersonFields, fieldPrefix: string, today: Date): FieldErrors => ({
  [`${fieldPrefix}firstName`]: validateRequired(fields.firstName),
  [`${fieldPrefix}lastName`]: validateRequired(fields.lastName),
  [`${fieldPrefix}dateOfBirth`]: validateDateOfBirth(fields.dateOfBirth, today),
  ...validateContact(fields, fieldPrefix),
});

const validateEntrepreneur = (form: PersonForm): FieldErrors => ({
  name: validateRequired(form.name),
  registrationNumber: validateRegistrationNumber(form.registrationNumber),
  vatNumber: validateVatNumber(form.vatNumber, form.isVatPayer),
  ...validateContact(form, ''),
});

const validateCompany = (form: PersonForm, today: Date): FieldErrors => ({
  name: validateRequired(form.name),
  registrationNumber: validateRegistrationNumber(form.registrationNumber),
  vatNumber: validateVatNumber(form.vatNumber, form.isVatPayer),
  ...validateContact(form, ''),
  legalFormId: form.legalFormId ? undefined : 'legalForm',
  ...validateNaturalPerson(form.representative, 'representative.', today),
});

/**
 * Checks the fields of the chosen person type before sending
 * @param form - current values of the form
 * @param today - date the age is calculated for
 * @returns error per field, undefined for a valid field
 */
export const validatePersonForm = (form: PersonForm, today: Date = new Date()): FieldErrors => {
  switch (form.personType) {
    case 'natural_person':
      return validateNaturalPerson(form, '', today);
    case 'entrepreneur':
      return validateEntrepreneur(form);
    case 'company':
      return validateCompany(form, today);
    default:
      return { personType: 'required' };
  }
};
