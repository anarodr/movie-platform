import { useEffect } from 'react'
import Button from '../../lib/buttons/ButtonFactory'
import { Link } from 'react-router'
import MoviesList from '../components/MoviesList'
import { getMovies } from '../store/actions'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAllMovies } from '../store/selectors'
import Loader from '../../lib/loaders/Loader'

import useSearchFilters from '../../shared/hooks/searchFilters'
import MovieListFilters from '../components/MovieListFilters'

export default function Movies() {
    const dispatch = useAppDispatch()
    const { resources, loading, params: moviesParams } = useAppSelector(getAllMovies)

    const { params, updateParam } = useSearchFilters(moviesParams)

    useEffect(() => {
        dispatch(getMovies(params))
    }, [dispatch, params])

    return (
        <>
            <div className='mx-5 my-4'>
                <div className='flex flex-col justify-center items-center'>
                    <div>
                        <h1 className='w-max text-5xl tracking-wide mb-8 bg-gradient-to-r from-[#0075ba] via-green-500 to-[#fae282] bg-clip-text text-transparent'>
                            Movies List
                        </h1>
                    </div>
                    <Button.Primary>
                        <Link to='/movies/new'>Add movie</Link>
                    </Button.Primary>
                </div>
                <MovieListFilters filterParams={params} updateParamHandler={updateParam} />
                <div className='relative mt-4'>
                    {loading ? <Loader /> : null}
                    <MoviesList movies={resources} />
                </div>
            </div>
        </>
    )
}
