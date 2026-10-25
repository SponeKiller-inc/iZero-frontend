import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import useEndSession from '@/hooks/useEndSession';
import LoadingSpinner from '@/components/ui/ts/LoadingSpinner';
import { LOCAL_STORAGE } from '@/services/localStorage';
import { SIGN_OUT_NOTICE, setSessionEndHandler } from '@/services/session';
import { SecureRouteProps } from './types';

function SecureRoute({ children }: SecureRouteProps) {
    const { isAuthenticated, loading } = useAuth();
    const endSession = useEndSession();

    useEffect(() => {
        setSessionEndHandler(endSession);
        return () => setSessionEndHandler(null);
    }, [endSession]);

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            const tokenRemoved = e.key === null
                || (e.key === LOCAL_STORAGE.accessToken.key && e.newValue === null);
            if (tokenRemoved) {
                endSession(SIGN_OUT_NOTICE.sessionEnded);
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [endSession]);

    if (loading) {
        return <LoadingSpinner />
    }

    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;  
    }

    return children; 
}

export default SecureRoute;
