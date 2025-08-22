import { Navigate } from 'react-router-dom';

import { SecureRouteProps } from './types';
import authService from '@/services/AuthService';

function SecureRoute({ children }: SecureRouteProps) {
    const isAuthenticated = authService.isAuthenticated();

    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;  
    }

    return children; 
}

export default SecureRoute;