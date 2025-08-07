import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import LeetSaveLogo from '../../images/LeetSaveLogo.png'
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { GoHome, GoCodeReview } from "react-icons/go";
import { SiBookstack } from "react-icons/si";
import { useState } from 'react';

const Header = () => {
  const [active, setActive] = useState('Home');
  console.log(active)
  return (
    <header className={styles.header}>
      <NavLink to={"/"} className={styles.logoContainer} >
        <img src={LeetSaveLogo} alt="LeetSave Logo" className={styles.logo} />
      </NavLink>
      <nav className={styles.nav}>
        <NavLink className={`${styles.navItemContainer} ${active === 'Home' ? styles.active : styles.inactive}`} onClick={() => setActive('Home')}>
          <GoHome className={styles.icon} />
          Home
        </NavLink>
        <NavLink to="/problems" className={`${styles.navItemContainer} ${active === 'Problems' ? styles.active : styles.inactive}`} onClick={() => setActive('Problems')}>
          <GoCodeReview className={styles.icon} />
          Problems
        </NavLink>
        <NavLink to="/problems/favorites" className={`${styles.navItemContainer} ${active === 'Favorites' ? styles.active : styles.inactive}`} onClick={() => setActive('Favorites')}>
          <FaRegHeart className={styles.icon} />
          Favorites
        </NavLink>
        <NavLink to="/study" className={`${styles.navItemContainer} ${active === 'Study' ? styles.active : styles.inactive}`} onClick={() => setActive('Study')}>
          <SiBookstack className={styles.icon} />
          Study
        </NavLink>
        <NavLink to="/profile" className={`${styles.navItemContainer} ${active === 'Profile' ? styles.active : styles.inactive}`} onClick={() => setActive('Profile')}>
          <FaRegUser className={styles.icon} />
          Profile
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;

