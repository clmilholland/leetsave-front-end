import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { useDispatch } from "react-redux";
const dispatch = useDispatch;

export const getAllProblems = createAsyncThunk(
    'problems/getAll',
    async ( token, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/problems', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            // console.log('response', response.data)
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

export const updateProblem = createAsyncThunk(
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

export const deleteProblem = createAsyncThunk(
    'problems/delete',
    async ({problemId, token}, { rejectWithValue }) => {
        try {
            console.log(problemId)
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
            .addCase(getAllProblems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProblems.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allProblems = action.payload;
            })
            .addCase(getAllProblems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //updateProblem
            .addCase(updateProblem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProblem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.problem = action.payload;
                dispatch(getAllProblems(localStorage.getItem('jwtToken')))
            })
            .addCase(updateProblem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //deleteProblem
            .addCase(deleteProblem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProblem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.problem = action.payload.problem;
                state.allProblems = state.allProblems.filter((problem) => problem.problemId !== action.payload.problem.problemId)
            })
            .addCase(deleteProblem.rejected, (state, action) => {
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