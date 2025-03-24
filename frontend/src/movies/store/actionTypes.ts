import { createActionNames } from '../../store/actions'

export const MOVIE_ACTION = 'MOVIE'

export const MOVIE_GET_ALL = createActionNames(`${MOVIE_ACTION}/getAll`)
export const MOVIE_GET_ONE = createActionNames(`${MOVIE_ACTION}/getOne`)
export const MOVIE_DELETE = createActionNames(`${MOVIE_ACTION}/delete`)
export const MOVIE_CREATE = createActionNames(`${MOVIE_ACTION}/create`)
export const MOVIE_UPDATE = createActionNames(`${MOVIE_ACTION}/update`)
