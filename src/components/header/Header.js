import React from 'react';
import styles from './Header.module.css';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img  alt="LeetSave Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <a href="/problems" className={styles.navItem}>Problems</a>
        <a href="/create" className={styles.navItem}>Create</a>
        <a href="/study" className={styles.navItem}>Study</a>
        <a href="/profile" className={styles.navItem}>Profile</a>
      </nav>
    </header>
  );
};

export default Header;

