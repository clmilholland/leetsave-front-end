import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img  alt="LeetSave Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <NavLink to="/problems" className={styles.navItem}>Problems</NavLink>
        <NavLink to="/create" className={styles.navItem}>Create</NavLink>
        <NavLink to="/study" className={styles.navItem}>Study</NavLink>
        <NavLink to="/profile" className={styles.navItem}>Profile</NavLink>
      </nav>
    </header>
  );
};

export default Header;

