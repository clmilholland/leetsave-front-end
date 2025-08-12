import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from './Register.module.css';
import { register, selectError } from "../../reducers/authSlice";
import { NavLink } from "react-router-dom";

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectError);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(formData)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>LeetSave</h2>
                <p className={styles.subtitle}>Sign up to save, create, study, and more</p>

                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={styles.input}
                    required
                />
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
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

                <p className={styles.terms}>
                    By signing up, you agree to our 
                    <a href="/terms" className={styles.link}> Terms</a>, 
                    <a href="/privacy" className={styles.link}> Privacy Policy</a>, and 
                    <a href="/cookies" className={styles.link}> Cookies Policy</a>.
                </p>

                <button type="submit" className={styles.button}>
                    Sign Up
                </button>
                
                <div className={styles.linkContainer}>Already have an account? <NavLink to='/login' className={styles.link}>Log in</NavLink></div>
                {error && <div className={styles.error}>{error}</div>}
            </form>
        </div>
    );
};
