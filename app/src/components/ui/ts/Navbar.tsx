import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from '../css/Navbar.module.css';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('components/Navbar');
  const links = [
    { label: t('Home'), to: '/' },
    { label: t('About'), to: '/about' },
    { label: t('Contact'), to: '/contact' },
    { label: t('Register'), to: '/register' },
    { label: t('Login'), to: '/login' }
  ];



  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <img src='iZero-logo.png' width='100' alt='Project Zero logo'></img>
        </Link>

        <button
          className={styles.toggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.links}>
            {links.map(link => (
              <li key={link.to} className={styles.linkItem}>
                <Link to={link.to} className={styles.link}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;