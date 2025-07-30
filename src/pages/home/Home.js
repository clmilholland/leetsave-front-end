import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllProblems,
  selectError,
  getAllProblems,
  deleteProblem,
} from "../../reducers/problemsSlice";
import { selectToken } from "../../reducers/authSlice";
import styles from "./Home.module.css";
import { ProblemCard } from "../problemcard/ProblemCard";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProblems = useSelector(selectAllProblems);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getAllProblems(token));
  }, [dispatch, token]);

  const handleDelete = (problemId) => {
    dispatch(deleteProblem({ problemId, token }));
  };

  const handleClick = (problem) => {
    console.log(problem)
    navigate(`/problems/${problem.problemId}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Saved Problems</h1>
      {error && <p className={styles.error}>Failed to load problems.</p>}
      <div className={styles.grid}>
        {allProblems ? (
          allProblems.map((problem) => (
            <div key={problem.id} className={styles.cardWrapper}>
              <div
                className={styles.card}
                onClick={() => navigate(`/problems/${problem.problemId}`)}
              >
                <div className={styles.header}>
                  <h3 className={styles.title}>{problem.title}</h3>
                  <span
                    className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <p className={styles.description}>{problem.shortDescription}</p>
                <div className={styles.tags}>
                  {problem.tags.map((tag, index) => (
                    <span className={styles.tag} key={index}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(problem.id)}
                >
                  Delete
                </button>
                <button className={styles.actionButton}>Favorite</button>
              </div>
            </div>
          ))
        ) : (
          <p>No problems saved...</p>
        )}
      </div>
    </div>
  );
};

