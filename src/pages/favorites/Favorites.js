import React from "react";
import { selectFavorites, getFavorites, selectError, deleteFavorite } from "../../reducers/problemsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectToken } from "../../reducers/authSlice";
import styles from './Favorites.module.css';
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector(selectFavorites);
    const token = useSelector(selectToken);
    const error = useSelector(selectError)
    console.log(error)

    useEffect(() => {
        dispatch(getFavorites(token))
    },[dispatch, token]);

    const handleDelete = (problemId) => {
        dispatch(deleteFavorite({ problemId, token }));
    }

    return (
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Favorite Problems</h1>
          {error && <p className={styles.error}>Failed to load problems.</p>}
          <div className={styles.grid}>
            {favorites ? (
              favorites.map((problem) => (
                <div key={problem.problemId} className={styles.cardWrapper}>
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
                      onClick={() => handleDelete(problem.problemId)}
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No problems saved...</p>
            )}
          </div>
        </div>
      );
}