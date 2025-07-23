import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setAuthError, logout } from "../reducers/authSlice";
import { jwtDecode }from 'jwt-decode';

export const Root = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('jwtToken');
            if(token) {
                try {
                    const decoded = jwtDecode(token);
                    if(decoded.exp * 1000 < Date.now()) {
                        dispatch(logout());
                        navigate('/welcome');
                    } else {
                        dispatch(setToken(token));
                    }
                } catch (error) {
                    dispatch(setAuthError('Invalid token'));
                    navigate('/welcome');
                }
            } else if (!isAuthenticated) {
                navigate('/welcome')
            }
        }
        initializeAuth();
    }, [dispatch, navigate, isAuthenticated]);

    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    )
};