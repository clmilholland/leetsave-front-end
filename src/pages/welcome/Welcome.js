import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import LeetSaveLogo from '../../images/LeetSaveLogo.png'

export const Welcome = ({ view }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container} >
        <div className={styles.welcomeContainer}>
            <img src={LeetSaveLogo} alt="LeetSave logo" className={styles.logo}/>
        <h4 className={styles.title}>
            Must be signed in to view {view}
        </h4>
        <h5 className={styles.subtitle}>
            Save, Create, Study and more with LeetSave
        </h5>
        <div className={styles.buttons}>
            <button
            className={styles.primaryButton}
            onClick={() => navigate("/register")}
            >
            Sign up for LeetSave
            </button>
            <button
            className={styles.secondaryButton}
            onClick={() => navigate("/login")}
            >
            Log in
            </button>
        </div>
        <p className={styles.disclaimer}>
            By continuing, you agree to LeetSave's{" "}
            <a href="/terms">Terms of Use</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
        </p>
        </div>
    </div>
  );
};