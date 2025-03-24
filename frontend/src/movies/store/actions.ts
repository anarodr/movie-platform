import { createAsyncThunk } from '@reduxjs/toolkit'
import { Movie } from '../types/Movies'
import { MovieQueryParams } from '../types/MovieQueryParams'
import {
    MOVIE_CREATE,
    MOVIE_DELETE,
    MOVIE_GET_ALL,
    MOVIE_GET_ONE,
    MOVIE_UPDATE,
} from './actionTypes'
import { MovieService } from '../services/MovieService'

export const getMovies = createAsyncThunk<Movie[], MovieQueryParams, { rejectValue: string }>(
    MOVIE_GET_ALL.name,
    async (params = {}, { rejectWithValue }) => {
        try {
            return await (
                await MovieService.getAll(params)
            ).data
        } catch (err) {
            return rejectWithValue(err as string)
        }
    },
)

export const getOneMovie = createAsyncThunk<Movie, string, { rejectValue: string }>(
    MOVIE_GET_ONE.name,
    async (id, { rejectWithValue }) => {
        try {
            return (await MovieService.getOne(id)).data
        } catch (err) {
            return rejectWithValue(err as string)
        }
    },
)

export const createMovie = createAsyncThunk<Movie, Movie, { rejectValue: string }>(
    MOVIE_CREATE.name,
    async (movie, { rejectWithValue }) => {
        try {
            const movieCreated = (await MovieService.create(movie)).data

            return movieCreated
        } catch (err) {
            return rejectWithValue(err as string)
        }
    },
)

export const deleteOneMovie = createAsyncThunk<Movie, string, { rejectValue: string }>(
    MOVIE_DELETE.name,
    async (id, { rejectWithValue }) => {
        try {
            return (await MovieService.deleteOne(id)).data
        } catch (err) {
            return rejectWithValue(err as string)
        }
    },
)

export const updateMovie = createAsyncThunk<Movie, { movie: Movie }, { rejectValue: string }>(
    MOVIE_UPDATE.name,
    async ({ movie }, { rejectWithValue }) => {
        try {
            const movieUpdated = (await MovieService.update(movie)).data
            return movieUpdated
        } catch (err) {
            return rejectWithValue(err as string)
        }
    },
)
