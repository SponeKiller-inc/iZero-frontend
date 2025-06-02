import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '../css/Navbar.module.css';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('components/Navbar');
  const links = [
    { label: t('Home'), href: '/' },
    { label: t('About'), href: '/about' },
    { label: t('Contact'), href: '/contact' },
    { label: t('Register'), href: '/register' },
    { label: t('Login'), href: '/login' }
  ];



  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a href='/' className={styles.logo}>
          <img src='iZero-logo.png' width='100'></img>
        </a>

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
              <li key={link.href} className={styles.linkItem}>
                <a href={link.href} className={styles.link}>{link.label}</a>
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