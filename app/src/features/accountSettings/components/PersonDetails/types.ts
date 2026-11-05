import { ChangeEvent, FocusEvent } from 'react';

import { PersonType } from '@/types/person';

// ----------------------------------------------------------------------------
// Form state: inputs work with text, an empty value is ''
// (API responses and requests are in @/types/person)
// ----------------------------------------------------------------------------

export type ContactFields = {
  phonePrefixId: string;
  phoneNumber: string;
  email: string;
};

export type NaturalPersonFields = ContactFields & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  titleNames: string[];
};

/**
 * Keeps the fields of all person types, so switching the type while adding loses nothing;
 * only the fields of the chosen type are validated and sent
 */
export type PersonForm = NaturalPersonFields & {
  personType: PersonType | '';
  name: string;
  legalFormId: string;
  registrationNumber: string;
  vatNumber: string;
  isVatPayer: boolean;
  representative: NaturalPersonFields;
};

export type PersonError =
  | 'required'
  | 'dateOfBirth'
  | 'age'
  | 'registrationLength'
  | 'registrationCheckDigit'
  | 'vatNumber'
  | 'vatPayer'
  | 'legalForm'
  | 'phone'
  | 'email';

/**
 * Error per field name, fields of the representative are prefixed with "representative."
 */
export type FieldErrors = Record<string, PersonError | undefined>;

/**
 * Translated errors and event handlers shared by the fields of the form
 */
export type FieldControls = {
  errors: Record<string, string | undefined>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
};
