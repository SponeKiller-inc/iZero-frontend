import { useState } from 'react';

import useLogout from '@/hooks/useLogout';
import styles from '../css/UserProfile.module.css'

const UserProfile = () => {
    const logout = useLogout();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return ( 
        <div className={styles.userMenu}>
            <div className={styles.userIcon} onClick={toggleMenu}>
                👤
            </div>
            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <ul>
                        <li onClick={logout}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
 
export default UserProfile;