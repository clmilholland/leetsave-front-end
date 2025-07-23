import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectAllProblems, selectProblem, selectError, getAllProblems } from "../../reducers/problemsSlice";
import { ProblemCard } from "../problemcard/ProblemCard";


export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProblems = useSelector(selectAllProblems);
    const problem = useSelector(selectProblem);
    const error = useSelector(selectError);
    const token = useSelector(selectToken);

    const fetchAllProblems = async () => {
        try {
            await dispatch(getAllProblems(token));
        } catch (error) {
            console.log(error);
        }
    }

    const displayProblems = () => {
        return allProblems.map((problem) => (
            <ProblemCard problem={problem} key={problem.id} />
        ))
    }

    console.log(allProblems)
    return (
        <div>
            <h1>Home Page!</h1>
            {allProblems ? displayProblems() : <></>}
        </div>
    )
}