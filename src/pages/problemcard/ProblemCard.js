import React, { useState } from "react";
import styles from './ProblemCard.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllProblems } from "../../reducers/problemsSlice";

export const ProblemCard = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const allProblems = useSelector(selectAllProblems);
  const { problemId } = useParams();
  const problem = allProblems.find((p) => p.problemId === problemId);

  if (!problem) return <p className={styles.error}>Problem not found.</p>;

  return (
    <div className={styles.pageWrapper}>
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

        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? "Hide Description" : "Show Description"}
          </button>
          {showDescription && (
            <pre className={styles.contentBlock}>{problem.description}</pre>
          )}
        </div>

        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={() => setShowPseudocode(!showPseudocode)}>
            {showPseudocode ? "Hide Pseudocode" : "Show Pseudocode"}
          </button>
          {showPseudocode && (
            <pre className={styles.contentBlock}><code>{problem.pseudocode}</code></pre>
          )}
        </div>

        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </button>
          {showCode && (
            <pre className={styles.contentBlock}><code>{problem.code}</code></pre>
          )}
        </div>
    </div>
  );
};

