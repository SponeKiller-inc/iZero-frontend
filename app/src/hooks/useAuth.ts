import { useState, useEffect, useMemo } from 'react';
import { AuthService } from '@/services/AuthService';
import { LocalStorageService } from '@/services/localStorage';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const localStorage = useMemo(() => new LocalStorageService(), []);
    const authService = useMemo(() => new AuthService(localStorage), [localStorage]);

    useEffect(() => {
        const checkAuth = async () => {
            const isValid = await authService.ensureAuthenticated();
            setIsAuthenticated(isValid);
            setLoading(false);
        };
        checkAuth();
    }, [authService]);

    return { isAuthenticated, loading };
};
 
export default useAuth;