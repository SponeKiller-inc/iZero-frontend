import { jwtDecode } from "jwt-decode";

import { LocalStorageService, LOCAL_STORAGE } from '@/services/localStorage';

// Values of the "provider" claim in the access token
export const AUTH_PROVIDER = Object.freeze({
  seed: 'seed',
  local: 'local',
  oauth: 'oauth',
});

interface JwtPayload {
  user_id: number;
  exp: number;
  provider: typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];
};

const getJwtTokenData = <T extends object = JwtPayload>(): T | null => {
  const localStorage = new LocalStorageService();
  const accessToken = localStorage.load<string>(LOCAL_STORAGE.accessToken.key)

  if (accessToken != null) {
    try {
      return jwtDecode<T>(accessToken);
    } catch {
      return null;
    }
  }
  return null
}

export default getJwtTokenData