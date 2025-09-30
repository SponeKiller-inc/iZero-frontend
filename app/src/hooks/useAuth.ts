import { useState, useEffect, useMemo, useContext } from 'react';

import { AuthService } from '@/services/AuthService';
import { UserContext } from '@/context/UserContext';
import getJwtTokenData from '@/utils/getJwtTokenData';

interface tokenPayload {
        user_id: number
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const authService = useMemo(() => new AuthService(), []);
    const { userID, setUserID } = useContext(UserContext);

    useEffect(() => {
        const checkAuth = async () => {
            const isValid = await authService.ensureAuthenticated();
            setIsAuthenticated(isValid);
            if (userID === 0) {
                const payload = getJwtTokenData<tokenPayload>()
                if (payload !== null) {
                    setUserID(payload.user_id)
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, [authService, userID, setUserID]);

    return { isAuthenticated, loading };
};
 
export default useAuth;