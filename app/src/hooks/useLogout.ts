import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { AuthService } from '@/services/AuthService';
import { LocalStorageService } from '@/services/localStorage';

const useLogout = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const localStorage = useMemo(() => new LocalStorageService(), []);
  const authService = useMemo(() => new AuthService(localStorage), [localStorage]);

  const logout = async () => {
    const isLoggedOut = await authService.logout()

    if (isLoggedOut) {
      toast.success(t('logout.success'));
      navigate('/login')
    } else {
      toast.error(t('logout.error'))
    }
  };

  return logout;
}

export default useLogout