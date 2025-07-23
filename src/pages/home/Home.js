import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const token = useSelector(selectToken);

    if(!token) navigate('/welcome');

    return (
        <div>
            <h1>Home Page!</h1>
        </div>
    )
}