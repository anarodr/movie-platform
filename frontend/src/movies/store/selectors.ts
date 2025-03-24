import { RootState } from '../../store'
import { MovieDetailState, MovieListState } from './reducers'

export function getAllMovies(state: RootState): MovieListState {
    return state.movies.list
}

export function getMovieDetail(state: RootState): MovieDetailState {
    return state.movies.detail
}
