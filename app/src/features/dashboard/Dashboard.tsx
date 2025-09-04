import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../utils/logout.js';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = (): void => setIsMenuOpen((v) => !v);

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.dashboardHeader}>
        <h1>Dashboard</h1>

        <div className={styles.userMenu}>
          <button
            type="button"
            className={styles.userIcon}
            onClick={toggleMenu}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
          >
            👤
          </button>

          {isMenuOpen && (
            <div className={styles.dropdownMenu} role="menu">
              <ul>
                <li role="menuitem" onClick={() => logout()}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className={styles.dashboardContent}>
        <section className={styles.dashboardWidgets}>
          <div className={styles.widget}>
            <h2>Welcome Back!</h2>
            <p>Here's a quick overview of your account.</p>
          </div>

          <div className={styles.widget}>
            <h2>Recent Activity</h2>
            <p>No recent activity.</p>
          </div>

          <div className={styles.widget}>
            <h2>Statistics</h2>
            <p>Your stats will appear here.</p>
          </div>
        </section>
      </main>

      <div className={styles.startChat}>
        <button
          className={styles.chatButton}
          onClick={() => navigate('/chat')}
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
