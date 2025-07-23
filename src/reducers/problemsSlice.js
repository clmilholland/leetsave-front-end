import { createAsyncthunk, createSlice } from "@reduxjs-toolkit";
import axios from "axios";
import { act } from "react";

export const getAllProblems = createAsyncthunk(
    'problems/getAll',
    async ( token, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/problems', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Could not get problems');
        }
    }
);

// export const createProblem = createAsyncthunk(
//     'problems/create',
//     async ( problemData, token, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/problems/create', {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify()
//             })
//         }
//     }
// )

export const updateProblem = createAsyncthunk(
    'problems/update',
    async ( problemData, token, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/problems/${problemData.problemId}`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Could not update problem');
        }
    }
);

export const deleteProblem = createAsyncthunk(
    'problems/delete',
    async ( problemId, token, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/problems/${problemId}`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Could not delete problem');
        }
    }
);

const problemsSlice = createSlice({
    name: 'problems',
    initialState: {
        allProblems: null,
        problem: null,
        loading: false,
        error: null
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //getAllProblems
            .addcase(getAllProblems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addcase(getAllProblems.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allProblems = action.payload.data;
            })
            .addcase(getAllProblems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //updateProblem
            .addcase(updateProblem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addcase(updateProblem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.problem = action.payload.data;
            })
            .addcase(updateProblem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //deleteProblem
            .addcase(deleteProblem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addcase(deleteProblem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.problem = action.payload.data;
            })
            .addcase(deleteProblem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const selectAllProblems = (state) => state.problems.allProblems;
export const selectProblem = (state) => state.problems.problem;
export const selectLoading = (state) => state.problems.loading;
export const selectError = (state) => state.problems.error;
export default problemsSlice.reducer;