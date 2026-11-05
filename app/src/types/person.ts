export type PersonType = 'natural_person' | 'entrepreneur' | 'company';

// ----------------------------------------------------------------------------
// API response: stored details, an empty value is null
// ----------------------------------------------------------------------------

type ContactOutput = {
  phonePrefixId: number | null;
  phonePrefix: string | null;
  phoneNumber: string | null;
  email: string | null;
  addresses: {
    id: number;
    addressType: string;
    address: {
      id: number;
      externalId: number;
      street: string | null;
      buildingNumber: string;
      orientationNumber: string | null;
      orientationNumberLetter: string | null;
      district: string | null;
      city: string;
      postalCode: number;
      countryId: number;
    };
  }[];
};

export type NaturalPersonOutput = ContactOutput & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  prefixTitles: string[];
  suffixTitles: string[];
};

export type EntrepreneurOutput = ContactOutput & {
  name: string;
  registrationNumber: string;
  vatNumber: string | null;
  isVatPayer: boolean;
};

export type CompanyOutput = ContactOutput & {
  name: string;
  registrationNumber: string;
  vatNumber: string | null;
  isVatPayer: boolean;
  legalFormId: number;
  legalForm: string;
  representative: NaturalPersonOutput;
};

export type UserPersonOutput = {
  id: number;
  personType: PersonType;
  naturalPerson: NaturalPersonOutput | null;
  entrepreneur: EntrepreneurOutput | null;
  company: CompanyOutput | null;
};

// ----------------------------------------------------------------------------
// API request: IDs are numbers, an empty value is null
// ----------------------------------------------------------------------------

export type ContactInput = {
  phonePrefixId: number | null;
  phoneNumber: string | null;
  email: string | null;
  addresses: { addressId: number; addressTypeId: number }[];
};

export type NaturalPersonInput = ContactInput & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  titleIds: number[];
};

export type EntrepreneurInput = ContactInput & {
  name: string;
  registrationNumber: string;
  vatNumber: string | null;
  isVatPayer: boolean;
};

export type CompanyInput = ContactInput & {
  name: string;
  registrationNumber: string;
  vatNumber: string | null;
  isVatPayer: boolean;
  legalFormId: number;
  representative: NaturalPersonInput;
};

/**
 * The server tells the person type apart by the fields of the details
 */
export type UserPersonInput = NaturalPersonInput | EntrepreneurInput | CompanyInput;

// ----------------------------------------------------------------------------
// API response: catalogues
// ----------------------------------------------------------------------------

export type Title = {
  id: number;
  name: string;
};

export type LegalForm = {
  id: number;
  code: string;
  name: string;
};

export type PhonePrefix = {
  id: number;
  prefix: string;
};
