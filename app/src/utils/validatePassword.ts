const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

/**
 * Kind of password field, decides which rules are checked
 * - current: password the user already has (sign in, current password)
 * - new: password being set (registration, new password)
 * - confirmation: new password typed again
 */
export type PasswordType = 'current' | 'new' | 'confirmation';

export type PasswordError = 'required' | 'length' | 'sameAsCurrent' | 'mismatch';

/**
 * Checks a password by the rules of its type (server stays authoritative)
 * @param type - kind of the password field
 * @param value - password to check
 * @param related - other passwords of the form the rules compare against
 *   (current password for "new" - optional, new password for "confirmation")
 * @returns first broken rule, undefined when the password is valid
 */
const validatePassword = (
  type: PasswordType,
  value: string,
  related: { currentPassword?: string; newPassword?: string } = {},
): PasswordError | undefined => {
  if (!value) {
    return 'required';
  }

  switch (type) {
    case 'current':
      return undefined;
    case 'new':
      if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
        return 'length';
      }
      if (value === related.currentPassword) {
        return 'sameAsCurrent';
      }
      return undefined;
    case 'confirmation':
      if (value !== related.newPassword) {
        return 'mismatch';
      }
      return undefined;
  }
};

export default validatePassword;
