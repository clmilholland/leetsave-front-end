import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const register = createAsyncThunk(
    'users/register',
    async ( userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Signup failed');
        }
    }
);

export const login = createAsyncThunk(
    'users/login',
    async ( userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', userData);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('jwtToken') || null,
        isAuthenticated: !!localStorage.getItem('jwtToken'),
        loading: false,
        error: null,
    }, 
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            state.error = null;
            localStorage.setItem('jwtToken', action.payload);
        },
        setAuthError(state, action) {
            state.error = action.payload;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('jwtToken');
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('jwtToken')
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('jwtToken', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('jwtToken', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(state.error)
            })
    }
});

export const { resetError, setToken, setAuthError, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;
export default authSlice.reducer;