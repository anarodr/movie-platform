import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MOVIE_ACTION } from './actionTypes'
import { Movie } from '../types/Movies'
import { MovieQueryParams } from '../types/MovieQueryParams'
import { getMovies, getOneMovie } from './actions'

export interface MovieListState {
    loading: boolean
    resources: Movie[]
    params: MovieQueryParams
}

const movieList = createSlice({
    name: MOVIE_ACTION,
    initialState: {
        loading: false,
        resources: [],
        params: {},
    } as MovieListState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMovies.pending, (state, action) => {
                state.loading = true
                state.params = action.meta.arg
            })
            .addCase(getMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.loading = false
                state.resources = action.payload
            })
            .addCase(getMovies.rejected, state => {
                state.loading = false
                state.params = {}
            })
    },
})

export interface MovieDetailState {
    loading: boolean
    data: Movie
}

const movieDetail = createSlice({
    name: MOVIE_ACTION,
    initialState: {} as MovieDetailState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOneMovie.pending, state => {
                state.loading = true
            })
            .addCase(getOneMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getOneMovie.rejected, state => {
                state.loading = false
            })
    },
})

export const moviesReducer = combineReducers({
    list: movieList.reducer,
    detail: movieDetail.reducer,
})
