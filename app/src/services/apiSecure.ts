import axios from 'axios';
import decamelizeKeys from 'decamelize-keys';
import camelizeKeys from 'camelcase-keys';

import { LocalStorageService, LOCAL_STORAGE } from './localStorage.js';
import { AuthService } from './AuthService.js';

const localStorage = new LocalStorageService();
const authService = new AuthService();

export const apiSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL+import.meta.env.VITE_API_ROUTER,
});

apiSecure.interceptors.request.use((config) => {
  // Just make sure, that accesstoken is refreshed (if was expired)
  authService.ensureAuthenticated()
  const accessToken = localStorage.load<string>(LOCAL_STORAGE.accessToken.key)
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Allow cookies
  config.withCredentials = true

  // Transfer data from camelCase to snake_case
  const contentType = config.headers?.['Content-Type'];
  
  if (contentType === 'application/json' && typeof config.data === 'object') {
    config.data = decamelizeKeys(config.data, { separator: '_', deep: true });
  }
    
  return config;
});

apiSecure.interceptors.response.use(
  (response) => {
    // Transfer data from snake_case to camelCase
    const contentType = response.headers?.['Content-Type'];
    
    if (contentType === 'application/json' && typeof response.data === 'object') {
      response.data = camelizeKeys(response.data, { deep: true });
    }
  
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Remove auth data + redirect to login page
      authService.logout()
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
