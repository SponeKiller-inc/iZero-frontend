import React from "react";

import SecureNavbar from './SecureNavbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from "../css/ModuleLayout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const ModuleLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.navbar}><SecureNavbar /></header>
      <div className={styles.body}>
        <aside className={styles.sidebar}><Sidebar /></aside>
        <main className={styles.content}>{children}</main>
      </div>
      <footer className={styles.footer}><Footer /></footer>
    </div>
  );
};

export default ModuleLayout;
