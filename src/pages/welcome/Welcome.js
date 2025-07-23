import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to LeetSave!</h1>
            <h3>A place to store all of your solved leetcode problems</h3>
            <img />
            <div>
                <h3>Join today</h3>
                <button onClick={() => navigate('/register')}>Create Account</button>
            </div>
            <div>
                <h4>Already have an account?</h4>
                <button onClick={() => navigate('/login')}>Sign in</button>
            </div>
        </div>
    )
}