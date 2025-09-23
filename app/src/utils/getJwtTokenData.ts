import { jwtDecode } from "jwt-decode";

import { LocalStorageService, LOCAL_STORAGE } from '@/services/localStorage';

interface JwtPayload {
  user_id: number;
  exp: number;
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