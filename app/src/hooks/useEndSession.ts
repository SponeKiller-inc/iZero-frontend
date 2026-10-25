import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@/context/UserContext';
import { ModuleContext } from '@/context/ModuleContext';
import { clearSession, SignOutNotice } from '@/services/session';

/**
 * Signs the user out locally (tokens, cookies, in-memory user data),
 * shows the notice and redirects to the login page
 */
const useEndSession = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { setUserID } = useContext(UserContext);
  const { setModules } = useContext(ModuleContext);

  return useCallback((notice: SignOutNotice) => {
    clearSession();
    setUserID(0);
    setModules({});
    toast.info(t(`signOutNotice.${notice}`));
    navigate('/login', { replace: true });
  }, [t, navigate, setUserID, setModules]);
};

export default useEndSession;
