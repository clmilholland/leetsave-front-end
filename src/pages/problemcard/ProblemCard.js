import React, { useState } from "react";
import styles from './ProblemCard.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllProblems } from "../../reducers/problemsSlice";

export const ProblemCard = () => {
  const [showCode, setShowCode] = useState(false);
  const allProblems = useSelector(selectAllProblems);
  const { problemId } = useParams();

  const problem = allProblems.find((p) => p.problemId === problemId);
  if (!problem) return <p className={styles.error}>Problem not found.</p>;

  return (
    <div className={styles.container}>
      {/* Top Section: Title, Difficulty, Tags */}
      <div className={styles.top}>
        <h2 className={styles.title}>{problem.title}</h2>
        <div className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
          {problem.difficulty}
        </div>
        <div className={styles.tags}>
          {problem.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Bottom Split Section: Description (left), Pseudocode & Code (right) */}
      <div className={styles.content}>
        <div className={styles.leftPane}>
          <h3>Description</h3>
          <pre className={styles.description}>{problem.description}</pre>
        </div>
        <div className={styles.rightPane}>
          <div className={styles.section}>
            <h3>Pseudocode</h3>
            <pre className={styles.pseudocode}><code>{problem.pseudocode}</code></pre>
          </div>
          <div className={styles.section}>
            <button className={styles.toggleButton} onClick={() => setShowCode(!showCode)}>
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode && (
              <pre className={styles.code}><code>{problem.code}</code></pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
