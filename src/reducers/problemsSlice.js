import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { useDispatch } from "react-redux";


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
    async ({problem, token}, { rejectWithValue }) => {
        // console.log(problem, token)
        try {
            const response = await axios.put(`http://localhost:5000/api/problems/${problem.problemId}`,
                problem, 
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Could not update problem');
        }
    }
);

export const deleteProblem = createAsyncThunk(
    'problems/delete',
    async ({problemId, token}, { rejectWithValue, dispatch }) => {
        try {
            console.log(problemId)
            const response = await axios.delete(`http://localhost:5000/api/problems/${problemId}`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            await dispatch(deleteFavorite({problemId, token}))
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

export const deleteFavorite = createAsyncThunk(
    'favorites/delete',
    async({ problemId, token}, {rejectWithValue}) => {
        console.log('called from other thunk')
        try {
            const response = await axios.delete(`http://localhost:5000/api/problems/favorites/${problemId}`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Could not delete favorite');
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
        },
        toggleIsFavorited: (state, action) => {
            const problemId = action.payload;
            const problem = state.allProblems.find((problem) => problem.problemId === problemId);
            console.log(problem.isFavorited)
            if(problem) problem.isFavorited = !problem.isFavorited;
            console.log(problem.isFavorited)
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
                const {problemId} = action.payload.problem;
                const token = localStorage.getItem('jwtToken')
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
                // dispatch(getFavorites(localStorage.getItem('jwtToken')))
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

            //delete favorite
            .addCase(deleteFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.favorites = action.payload.userFavorites;
            })
            .addCase(deleteFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { toggleIsFavorited } = problemsSlice.actions;
export const selectFavorites = (state) => state.problems.favorites;
export const selectAllProblems = (state) => state.problems.allProblems;
export const selectProblem = (state) => state.problems.problem;
export const selectLoading = (state) => state.problems.loading;
export const selectError = (state) => state.problems.error;
export default problemsSlice.reducer;