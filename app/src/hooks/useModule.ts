import { useContext, useMemo, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { ModuleService } from '@/services/ModuleService';
import { UserContext } from '@/context/UserContext';
import getAxiosStatus from "@/utils/getAxiosStatus";

const useModule = () => {
  const { t } = useTranslation('api/user');
  const moduleService = useMemo(() => new ModuleService(), []);
  const { userID } = useContext(UserContext);

  const [modules, setModules] = useState<Record<string, string[]> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await moduleService.get_user_modules(userID);
        setModules(data);
        toast.success(t('getUserModules.http.200'));
      } catch (error: unknown) {
        const status = getAxiosStatus(error);
        toast.error(t(`getUserModules.http.${status}`));
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchModules();
    }
  }, [userID, moduleService, t]);

  return { modules, loading };
};

export default useModule;