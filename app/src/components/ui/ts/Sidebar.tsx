import useModule from '@/hooks/useModule';
import LoadingSpinner from './LoadingSpinner';

import styles from '../css/Sidebar.module.css'

const Sidebar: React.FC = () => {
  const { modules, loading } = useModule();

  const getIconPath = (group: string) => {
    return `/icons/modules/${group.toLowerCase()}.svg`;
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/icons/modules/default.png';
  };

  return (
    <nav className={styles.sidebar}>
      {loading && <LoadingSpinner />}

      <ul className={styles.list}>
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
                <span className={styles.label}>{group}</span>
              </div>
              <div className={styles.right}>
                <span className={styles.arrow}>▶</span>
              </div>
            </div>

            <ul className={styles.submenu}>
              {(items).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};



export default Sidebar;