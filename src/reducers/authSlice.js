import { createAsyncthunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const register = createAsyncthunk(
    'users/register',
    async ( userData, { rejecectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', userData);
            return response.data;
        } catch (error) {
            return rejecectWithValue(error.response.data.message || 'Signup failed');
        }
    }
);

export const login = createAsyncthunk(
    'users/login',
    async ( userData, { rejecectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', userData);
            return response.data
        } catch (error) {
            return rejecectWithValue(error.response.data.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    }, 
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //register
            .addcase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addcase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addcase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Login
            .addcase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addcase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addcase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { resetError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;
export default authSlice.reducer;