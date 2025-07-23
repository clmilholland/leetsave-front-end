import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/authSlice';
import problemsReducer from '../reducers/problemsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        problems: problemsReducer,
    }
})