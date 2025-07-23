import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from './Welcome.module.css';

export const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to LeetSave!</h1>
            <h3 className={styles.subtitle}>A place to store all of your solved LeetCode problems</h3>
            <img 
                className={styles.image} 
                src="" 
                alt="LeetSave Banner"
            />
            <div className={styles.section}>
                <h3>Join today</h3>
                <button className={styles.button} onClick={() => navigate('/register')}>
                    Create Account
                </button>
            </div>
            <div className={styles.section}>
                <h4>Already have an account?</h4>
                <button className={styles.button} onClick={() => navigate('/login')}>
                    Sign In
                </button>
            </div>
        </div>
    );
}