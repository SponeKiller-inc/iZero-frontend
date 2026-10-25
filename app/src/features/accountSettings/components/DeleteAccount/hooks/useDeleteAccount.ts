import { useContext, useMemo, useState } from 'react';

import { UserService } from '@/services/UserService';
import { UserContext } from '@/context/UserContext';
import { SIGN_OUT_NOTICE } from '@/services/session';
import useEndSession from '@/hooks/useEndSession';
import getAxiosStatus from '@/utils/getAxiosStatus';
import { DeleteStatus } from '../types';

const useDeleteAccount = () => {
  const userService = useMemo(() => new UserService(), []);
  const { userID } = useContext(UserContext);
  const endSession = useEndSession();
  const [status, setStatus] = useState<DeleteStatus>('idle');

  const deleteAccount = async () => {
    // Only one deliberate deletion at a time
    if (status === 'processing') {
      return;
    }

    setStatus('processing');

    try {
      await userService.deleteUser(userID);
    } catch (error: unknown) {
      switch (getAxiosStatus(error)) {
        case 409:
          // Admin account cannot be deleted - user stays signed in
          setStatus('adminAccount');
          return;
        case 404:
          // Account or access is no longer valid - neutral sign out
          endSession(SIGN_OUT_NOTICE.sessionEnded);
          return;
        default:
          // Result could not be confirmed - never retried automatically
          setStatus('unknown');
          return;
      }
    }

    endSession(SIGN_OUT_NOTICE.accountDeleted);
  };

  const reset = () => setStatus('idle');

  return { status, deleteAccount, reset };
};

export default useDeleteAccount;
