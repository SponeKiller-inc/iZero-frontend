import { useMatches, UIMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from '../css/Navbar.module.css';

type MatchWithHandle = UIMatch<unknown, {label: string}>;

const SecureNavbar: React.FC = () => {
  const matches = useMatches() as MatchWithHandle[];
  const { t } = useTranslation('other/appRoutes');
  
  // Find page label defined in appRoutes
  const deepest = [...matches].reverse().find(m => m.handle?.label);
  const label = deepest ? t(deepest?.handle?.label) : '';
  
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <img src='iZero-logo.png' width='100' alt='Project Zero logo'></img>
        </Link>
        <div className={styles.label}>
          { label }
        </div>
        <UserProfile />
      </div>
    </div>
  );
};

export default SecureNavbar;