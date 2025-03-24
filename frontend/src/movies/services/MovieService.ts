import { AxiosResponse } from 'axios'
import apiClient from '../../axios/apiClient'
import { MovieQueryParams } from '../types/MovieQueryParams'
import { Movie } from '../types/Movies'

export const MovieService = {
    getAll: (params?: MovieQueryParams): Promise<AxiosResponse<Movie[]>> =>
        apiClient.get('/movies', {
            params: params,
        }) as Promise<AxiosResponse<Movie[]>>,

    create: (movie: Movie): Promise<AxiosResponse<Movie>> =>
        apiClient.post('/movies', movie) as Promise<AxiosResponse<Movie>>,

    update: (movie: Movie): Promise<AxiosResponse<Movie>> =>
        apiClient.put(`/movies/`, movie) as Promise<AxiosResponse<Movie>>,

    getOne: (id: string): Promise<AxiosResponse<Movie>> =>
        apiClient.get(`/movies/${id}`) as Promise<AxiosResponse<Movie>>,

    deleteOne: (id: string): Promise<AxiosResponse<Movie>> =>
        apiClient.delete(`/movies/${id}`) as Promise<AxiosResponse<Movie>>,
}
