import api from '../services/api';

export const verifyToken = async (): Promise<boolean> => {
  const token = sessionStorage.getItem('accessToken');
  if (!token) return false;

  try {
    await api.get('/token/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error: unknown) {

    if (error instanceof Error) {
      return false;
    }
    return false;
  }
};

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  try {
    const response = await api.post<{ access_token: string }>('/token/refresh-token', {
      refresh_token: refreshToken,
    });

    sessionStorage.setItem('accessToken', response.data.access_token);
    return true;
  } catch (error: unknown) {

    if (error instanceof Error) {
      return false;
    }
    return false;
  }
};
