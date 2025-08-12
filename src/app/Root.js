import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setAuthError, logout, selectIsAuthenticated } from "../reducers/authSlice";
import { jwtDecode }from 'jwt-decode';
import Header from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Welcome } from "../pages/welcome/Welcome";

export const Root = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('jwtToken');
            if(token) {
                try {
                    const decoded = jwtDecode(token);
                    if(decoded.exp * 1000 < Date.now()) {
                        dispatch(logout());
                        navigate('/');
                    } else {
                        dispatch(setToken(token));
                    }
                } catch (error) {
                    dispatch(setAuthError('Invalid token'));
                    navigate('/');
                }
            } else if (!isAuthenticated) {
                navigate('/')
            }
        }
        initializeAuth();
    }, [dispatch, navigate, isAuthenticated]);

    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer />
        </>
    )
};