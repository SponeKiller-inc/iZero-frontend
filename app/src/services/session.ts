import { LocalStorageService, LOCAL_STORAGE } from './localStorage';

/**
 * Reason why the user was signed out, shown as a toast
 */
export const SIGN_OUT_NOTICE = Object.freeze({
  accountDeleted: 'accountDeleted',
  sessionEnded: 'sessionEnded',
});

export type SignOutNotice = typeof SIGN_OUT_NOTICE[keyof typeof SIGN_OUT_NOTICE];

const CLIENT_COOKIES = ['csrf_token'];

/**
 * Removes all auth data of the user stored in the browser
 */
export const clearSession = (): void => {
  new LocalStorageService().delete(LOCAL_STORAGE.accessToken.key);

  CLIENT_COOKIES.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict; Secure`;
  });
};

let sessionEndHandler: ((notice: SignOutNotice) => void) | null = null;

/**
 * Registers handler which ends the session inside the app (set by SecureRoute)
 */
export const setSessionEndHandler = (handler: typeof sessionEndHandler): void => {
  sessionEndHandler = handler;
};

/**
 * Ends the session from outside of React (e.g. API interceptor)
 */
export const requestSessionEnd = (notice: SignOutNotice): void => {
  if (sessionEndHandler) {
    sessionEndHandler(notice);
    return;
  }

  clearSession();
};
