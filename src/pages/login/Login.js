import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectError } from "../../reducers/authSlice";
import styles from "./Login.module.css";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (err) {
      console.log("login error", err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Log In</h2>
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
        <button type="submit" className={styles.button}>
          Log In
        </button>
        <div className={styles.linkContainer}>Don't have an account? <NavLink to='/register' className={styles.link}>Sign up</NavLink></div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};
