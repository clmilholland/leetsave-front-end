import React from "react";
import styles from './ProblemCard.module.css';

export const ProblemCard = ({problem}) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>{problem.title}</h2>
                <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
                    {problem.difficulty}
                </span>
            </div>

            <div className={styles.section}>
                <h3>Description</h3>
                <p>{problem.description}</p>
            </div>

            <div className={styles.section}>
                <h3>Code</h3>
                <pre className={styles.code}>
                    <code>{problem.code}</code>
                </pre>
            </div>

            <div className={styles.section}>
                <h3>Pseudocode</h3>
                <pre className={styles.pseudocode}>
                    <code>{problem.pseudocode}</code>
                </pre>
            </div>
        </div>
    )
}