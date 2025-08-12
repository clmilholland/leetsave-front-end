import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllProblems,
  selectError,
  getAllProblems,
  deleteProblem,
  updateProblem,
  toggleIsFavorited,
} from "../../reducers/problemsSlice";
import { selectToken, selectIsAuthenticated } from "../../reducers/authSlice";
import styles from "./Problems.module.css";
import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Welcome } from "../welcome/Welcome";

export const Problems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProblems = useSelector(selectAllProblems);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(isAuthenticated)
  useEffect(() => {
    dispatch(getAllProblems(token));
  }, [dispatch, token]);

  const handleDelete = (problemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this problem?");
    if (confirmed) {
      dispatch(deleteProblem({ problemId, token }));
    }
  };

  const handleClick = (problem) => {
    navigate(`/problems/${problem.problemId}`);
  };

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
          <h1 className={styles.pageTitle}>Saved Problems</h1>
          <div className={styles.grid}>
            {allProblems?.length ? (
              allProblems.map((problem) => (
                <div key={problem.problemId} className={styles.cardWrapper}>
                  <div className={styles.card} onClick={() => handleClick(problem)}>
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
                      <MdDeleteForever
                        className={styles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(problem.problemId);
                        }}
                      />
                      <FaHeart
                        className={`${styles.favoriteButton} ${problem.isFavorited ? styles.favorited : ""}`}
                        onClick={(e) => handleToggleFavorites(e, problem)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No problems saved...</p>
            )}
          </div>
      </>
      )
    } else {
        return (
          <>
            <Welcome view='problems'/>
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
