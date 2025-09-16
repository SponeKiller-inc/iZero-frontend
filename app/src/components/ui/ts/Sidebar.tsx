import styles from '../css/Sidebar.module.css'

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        <li className={styles.menuItemWrapper}>
          <div className={styles.menuItem}>
            <div className={styles.left}>
              <span className={styles.icon}>⚙️</span>
              <span className={styles.label}>Nastavení</span>
            </div>
            <div className={styles.right}>
              <span className={styles.arrow}>▶</span>
            </div>
          </div>

          {/* volitelný dropdown */}
          <ul className={styles.submenu}>
            <li>Profil</li>
            <li>Účty</li>
            <li>Oznámení</li>
          </ul>
        </li>

        {/* další položky – jen pro ukázku */}
        <li className={styles.menuItem}>
          <div className={styles.left}>
            <span className={styles.icon}>📊</span>
            <span className={styles.label}>Přehled</span>
          </div>
          <div className={styles.right}>
            <span className={styles.arrow}>▶</span>
          </div>
        </li>

        <li className={styles.menuItem}>
          <div className={styles.left}>
            <span className={styles.icon}>🧾</span>
            <span className={styles.label}>Reporty</span>
          </div>
          <div className={styles.right}>
            <span className={styles.arrow}>▶</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;