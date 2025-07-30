import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllProblems,
  selectProblem,
  selectError,
  getAllProblems,
  deleteProblem,
} from "../../reducers/problemsSlice";
import { selectToken } from "../../reducers/authSlice";
import styles from "./Home.module.css";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProblems = useSelector(selectAllProblems);
  const problem = useSelector(selectProblem);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);

  useEffect(() => {
      dispatch(getAllProblems(token));
  }, [dispatch, token]);

  const handleDelete = (problemId) => {
    dispatch(deleteProblem({problemId, token}));
  }

  // const displayProblems = () => {
  //   return allProblems.map((problem) => (
  //     <div>
  //       <div
  //         className={styles.card}
  //         key={problem.id}
  //         onClick={() => navigate(`/problems/${problem.id}`)}
  //       >
  //         <div className={styles.header}>
  //           <h3 className={styles.title}>{problem.title}</h3>
  //           <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
  //             {problem.difficulty}
  //           </span>
  //         </div>
  //         <p className={styles.description}>{problem.shortDescription}</p>
  //         <div className={styles.tags}>
  //           {problem.tags.map((tag, index) => (
  //             <span className={styles.tag} key={index}>{tag}</span>
  //           ))}
  //         </div>
  //       </div>
  //       <button onClick={() => handleDelete(problem.problemId)} >Delete</button>
  //       <button>Favorite</button>
  //     </div>
  //   ));
  // };
 
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Saved Problems</h1>
      {error && <p className={styles.error}>Failed to load problems.</p>}
      <div className={styles.grid}>
        {allProblems ? allProblems.map((problem) => (
      <div>
        <div
          className={styles.card}
          key={problem.id}
          onClick={() => navigate(`/problems/${problem.id}`)}
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
              <span className={styles.tag} key={index}>{tag}</span>
            ))}
          </div>
        </div>
        <button onClick={() => handleDelete(problem.problemId)} >Delete</button>
        <button>Favorite</button>
      </div>
    )) : <p>No problems saved...</p>}
      </div>
    </div>
  );
};
