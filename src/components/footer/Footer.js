import React from "react";
import styles from './Footer.module.css';
import { useLocation } from "react-router-dom";

export const Footer = () => {
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    return (
        <footer className={isHomepage ? styles.homeFooter : styles.footer}>
        <h2 className={styles.heading}>Contact</h2>
        <div className={styles.contactGroup}>
            <div className={styles.contactItem}>
            <h3>Email</h3>
            <a href="mailto:contact@leetsave.app">contact@leetsave.app</a>
            </div>
            <div className={styles.contactItem}>
            <h3>GitHub</h3>
            <a href="https://github.com/leetsave" target="_blank" rel="noreferrer">
                github.com/leetsave
            </a>
            </div>
        </div>
        </footer>
    );
};
