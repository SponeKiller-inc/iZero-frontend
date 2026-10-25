import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useLogout from '@/hooks/useLogout';
import styles from '../css/UserProfile.module.css'

const UserProfile = () => {
    const { t } = useTranslation('common');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return ( 
        <div className={styles.userMenu}>
            <button
                type="button"
                className={styles.userIcon}
                onClick={toggleMenu}
            >
                👤
            </button>
            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <ul>
                        <li>
                            <Link to="/account-settings" className={styles.menuLink}>
                                {t('profileMenu.accountSettings')}
                            </Link>
                        </li>
                        <li onClick={useLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
 
export default UserProfile;
