import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login, selectError } from "../../reducers/authSlice";
import styles from './Login.module.css';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectError);
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(formData)).unwrap();
            navigate('/')
        } catch (error) {
            console.log('login error', error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Login</h2>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Log In</button>
                {error ? <div>{error}</div> : <></>}
            </form>
        </div>
    )
}