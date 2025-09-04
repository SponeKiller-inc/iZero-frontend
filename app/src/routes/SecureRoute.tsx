import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/ts/LoadingSpinner';
import { SecureRouteProps } from './types';

function SecureRoute({ children }: SecureRouteProps) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />
    }

    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" />;  
    }

    return children; 
}

export default SecureRoute;