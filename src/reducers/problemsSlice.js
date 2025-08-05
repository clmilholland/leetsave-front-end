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

export const addFavorite = createAsyncThunk(
    'favorites/add',
    async({problem, token}, {rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/problems/favorites`,
                problem,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data || 'Could not add to favorites');
        }
    }
);


export const getFavorites = createAsyncThunk(
    'favorites/getAll',
    async( token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/problems/favorites`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Could not get favorites');
        }
    }
)

const problemsSlice = createSlice({
    name: 'problems',
    initialState: {
        allProblems: null,
        favorites: [],
        problem: null,
        loading: false,
        error: null
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        }
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

            //addFavorite
            .addCase(addFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.favorites = state.favorites.push(action.payload)
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //getFavorites
            .addCase(getFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.favorites = action.payload;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const selectFavorites = (state) => state.problems.favorites;
export const selectAllProblems = (state) => state.problems.allProblems;
export const selectProblem = (state) => state.problems.problem;
export const selectLoading = (state) => state.problems.loading;
export const selectError = (state) => state.problems.error;
export default problemsSlice.reducer;