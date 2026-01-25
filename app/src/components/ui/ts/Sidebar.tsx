import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useModule from '@/hooks/useModule';
import LoadingSpinner from './LoadingSpinner';
import styles from '../css/Sidebar.module.css'

const Sidebar: React.FC = () => {
  const { modules, loading } = useModule();
  const { t } = useTranslation('components/Sidebar');

  const getIconPath = (group: string) => {
    return `/icons/modules/${group.toLowerCase()}.svg`;
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/icons/modules/default.svg';
  };
  
  return (
    <nav className={styles.sidebar}>
      {loading && <LoadingSpinner />}

      <ul className={styles.list}>
        {/* Dashboard */}
        <li className={styles.menuItemWrapper}>
            <div className={styles.menuItem}>
              <div className={styles.left}>
                <img
                  src={getIconPath('dashboard')}
                  alt={'dashboard'}
                  className={styles.icon}
                  onError={handleImgError}
                />
                  <Link to={'/dashboard'} className={styles.label}>{t('dashboard')}</Link>
              </div>
            </div>
          </li>

        {/* Modules */}
        {Object.entries(modules ?? {}).map(([group, items]) => (
          <li key={group} className={styles.menuItemWrapper}>
            <div className={styles.menuItem}>
              <div className={styles.left}>
                <img
                  src={getIconPath(group)}
                  alt={group}
                  className={styles.icon}
                  onError={handleImgError}
                />
                <span className={styles.label}>{t(`${group}.main`)}</span>
              </div>
              <div className={styles.right}>
                <span className={styles.arrow}>▶</span>
              </div>
            </div>

            <ul className={styles.submenu}>
              {(items).map((item) => (
                <li key={item}>
                  <Link to={`/${group}/${item}`} className={styles.label}>{t(`${group}.${item}`)}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};



export default Sidebar;