import React from "react";
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" alt="LeetSave Logo" className={styles.logo} />
        <h1 className={styles.title}>LeetSave</h1>
        <p className={styles.subtitle}>Save. Study. Succeed.</p>
      </header>

      <section className={styles.about}>
        <h2>About LeetSave</h2>
        <p>
          LeetSave helps you save, organize, and study coding problems from LeetCode and beyond.
          Perfect for technical interview prep, daily challenges, or building your coding skills.
        </p>
      </section>

      <section className={styles.contact}>
        <h2>Contact</h2>
        <ul>
          <li><a href="mailto:contact@leetsave.app">Email: contact@leetsave.app</a></li>
          <li><a href="https://github.com/example/leetsave" target="_blank" rel="noreferrer">GitHub: github.com/leetsave</a></li>
        </ul>
      </section>
    </div>
  );
};


