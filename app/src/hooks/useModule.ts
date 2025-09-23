import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { ModuleService } from '@/services/ModuleService';
import { UserContext } from '@/context/UserContext';

const useModule = () => {
  const { t } = useTranslation('other/module');
  const navigate = useNavigate();
  const moduleService = useMemo(() => new ModuleService(), []);
  const { userID } = useContext(UserContext);

  const getModules = async () => {
        const isSuccess = false;
    if (userID !== null) {
        try:
            const modules = await moduleService.get_user_modules(userID)
        catch (AxiosError):
    }
    if (isLoggedOut) {
      toast.success(t('getUserModules.success'));
      navigate('/login')
    } else {
      toast.error(t('getUserModules.error'))
    }
  };

  return logout;
}

export default useLogout