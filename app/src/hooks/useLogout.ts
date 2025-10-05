import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { AuthService } from '@/services/AuthService';

const useLogout = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);


  const logout = () => {
    authService.logout().then((isLoggedOut) => {
      if (isLoggedOut) {
        toast.success(t('logout.success'));
        navigate('/login');
      } else {
        toast.error(t('logout.error'));
      }
    }).catch(() => {
      toast.error(t('logout.error'));
    });
  };

    logout();

};

export default useLogout