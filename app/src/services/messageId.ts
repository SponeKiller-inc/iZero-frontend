/**
 * Message IDs returned by the API in error responses
 */
export const API_MESSAGE_ID = {
  bankNotFound: 6000001,
  bankAccountAlreadyExists: 6010002,
  bankAccountValidationFailed: 6010003,
  personAlreadyExists: 7000002,
  personValidationFailed: 7000004,
  phoneValidationFailed: 8000001,
  emailValidationFailed: 8010001,
} as const;
