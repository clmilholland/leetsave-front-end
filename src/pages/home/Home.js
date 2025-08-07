import React from "react";
import styles from './Home.module.css';
import ParticleBackground from "../../ParticleBackground";
import LeetSaveLogo from '../../images/LeetSaveLogo.png'

export const Home = () => {
  return (
    <div className={styles.container}>
      <ParticleBackground />

      <header className={styles.header}>
        <img src={LeetSaveLogo} alt="LeetSave Logo" className={styles.logo} />
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
    </div>
  );
};


