import {
  CompanyInput,
  CompanyOutput,
  ContactInput,
  EntrepreneurInput,
  EntrepreneurOutput,
  NaturalPersonInput,
  NaturalPersonOutput,
  Title,
  UserPersonInput,
  UserPersonOutput,
} from '@/types/person';
import { ContactFields, NaturalPersonFields, PersonForm } from './types';

// ----------------------------------------------------------------------------
// Stored details -> form: inputs
// ----------------------------------------------------------------------------

const EMPTY_CONTACT: ContactFields = {
  phonePrefixId: '',
  phoneNumber: '',
  email: '',
};

const EMPTY_NATURAL_PERSON: NaturalPersonFields = {
  ...EMPTY_CONTACT,
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  titleNames: [],
};

export const EMPTY_FORM: PersonForm = {
  ...EMPTY_NATURAL_PERSON,
  personType: '',
  name: '',
  legalFormId: '',
  registrationNumber: '',
  vatNumber: '',
  isVatPayer: false,
  representative: EMPTY_NATURAL_PERSON,
};

const toContactFields = (details: {
  phonePrefixId: number | null;
  phoneNumber: string | null;
  email: string | null;
}): ContactFields => ({
  phonePrefixId: details.phonePrefixId?.toString() ?? '',
  phoneNumber: details.phoneNumber ?? '',
  email: details.email ?? '',
});

const toNaturalPersonFields = (details: NaturalPersonOutput): NaturalPersonFields => ({
  ...toContactFields(details),
  firstName: details.firstName,
  lastName: details.lastName,
  dateOfBirth: details.dateOfBirth,
  titleNames: [...details.prefixTitles, ...details.suffixTitles],
});

const toEntrepreneurFields = (details: EntrepreneurOutput) => ({
  ...toContactFields(details),
  name: details.name,
  registrationNumber: details.registrationNumber,
  vatNumber: details.vatNumber ?? '',
  isVatPayer: details.isVatPayer,
});

const toCompanyFields = (details: CompanyOutput) => ({
  ...toContactFields(details),
  name: details.name,
  registrationNumber: details.registrationNumber,
  vatNumber: details.vatNumber ?? '',
  isVatPayer: details.isVatPayer,
  legalFormId: details.legalFormId.toString(),
  representative: toNaturalPersonFields(details.representative),
});

/**
 * Fills the form with the stored details
 * @param person - stored person details
 */
export const toPersonForm = ({ personType, naturalPerson, entrepreneur, company }: UserPersonOutput): PersonForm => ({
  ...EMPTY_FORM,
  ...(naturalPerson && toNaturalPersonFields(naturalPerson)),
  ...(entrepreneur && toEntrepreneurFields(entrepreneur)),
  ...(company && toCompanyFields(company)),
  personType,
});

// ----------------------------------------------------------------------------
// Form -> request to Server
// ----------------------------------------------------------------------------

/**
 * Addresses are not part of these details; an empty list keeps the stored ones.
 * @param fields - phone and e-mail from the form
 */
const toContactInput = (fields: ContactFields): ContactInput => ({
  phonePrefixId: fields.phonePrefixId ? Number(fields.phonePrefixId) : null,
  phoneNumber: fields.phoneNumber.trim() || null,
  email: fields.email.trim() || null,
  addresses: [],
});

const toNaturalPersonInput = (fields: NaturalPersonFields, titles: Title[]): NaturalPersonInput => ({
  ...toContactInput(fields),
  firstName: fields.firstName.trim(),
  lastName: fields.lastName.trim(),
  dateOfBirth: fields.dateOfBirth,
  titleIds: titles.filter(({ name }) => fields.titleNames.includes(name)).map(({ id }) => id),
});

const toEntrepreneurInput = (form: PersonForm): EntrepreneurInput => ({
  ...toContactInput(form),
  name: form.name.trim(),
  registrationNumber: form.registrationNumber.trim(),
  vatNumber: form.vatNumber.trim() || null,
  isVatPayer: form.isVatPayer,
});

const toCompanyInput = (form: PersonForm, titles: Title[]): CompanyInput => ({
  ...toContactInput(form),
  name: form.name.trim(),
  registrationNumber: form.registrationNumber.trim(),
  vatNumber: form.vatNumber.trim() || null,
  isVatPayer: form.isVatPayer,
  legalFormId: Number(form.legalFormId),
  representative: toNaturalPersonInput(form.representative, titles),
});

/**
 * Builds the request with the fields of the chosen person type only
 * @param form - current values of the form
 * @param titles - catalogue of titles, the stored details identify titles by name only
 */
export const toPersonInput = (form: PersonForm, titles: Title[]): UserPersonInput => {
  if (form.personType === 'natural_person') {
    return toNaturalPersonInput(form, titles);
  }

  if (form.personType === 'company') {
    return toCompanyInput(form, titles);
  }

  return toEntrepreneurInput(form);
};
