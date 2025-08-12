import React, { useEffect } from "react";
import {
  selectFavorites,
  getAllProblems,
  selectAllProblems,
  selectError,
  toggleIsFavorited,
  updateProblem
} from "../../reducers/problemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectIsAuthenticated } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import styles from "./Favorites.module.css";
import { FaHeart } from "react-icons/fa";
import { Welcome } from "../welcome/Welcome";

export const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProblems = useSelector(selectAllProblems);
  const token = useSelector(selectToken);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(getAllProblems(token));
  }, [dispatch, token]);

  const handleToggleFavorites = (e, problem) => {
    e.stopPropagation();
    dispatch(toggleIsFavorited(problem.problemId));

    const updatedProblem = {
      ...problem,
      isFavorited: !problem.isFavorited,
    };

    dispatch(updateProblem({ problem: updatedProblem, token }));
  };

  const determineView = () => {
    if(isAuthenticated) {
      return (
        <>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Favorite Problems</h1>
            {error && <p className={styles.error}>Failed to load problems.</p>}
            <div className={styles.grid}>
              {allProblems && allProblems.some(p => p.isFavorited) ? (
                allProblems
                  .filter((problem) => problem.isFavorited)
                  .map((problem) => (
                    <div key={problem.problemId} className={styles.cardWrapper}>
                      <div
                        className={styles.card}
                        onClick={() => navigate(`/problems/${problem.problemId}`)}
                      >
                      <div className={styles.header}>
                        <h3 className={styles.title}>{problem.title}</h3>
                        <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
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
                      <div className={styles.buttonGroup}>
                        <FaHeart
                          className={`${styles.favoriteButton} ${problem.isFavorited ? styles.favorited : ""}`}
                          onClick={(e) => handleToggleFavorites(e, problem)}
                        />
                      </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className={styles.empty}>No problems saved...</p>
              )}
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <Welcome view='favorites' />
        </>
      )
    }
  }

  return (
    <div className={styles.container}>
      {determineView()}
    </div>
  );
};
