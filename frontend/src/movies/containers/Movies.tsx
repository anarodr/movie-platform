import { useEffect, useState } from 'react'
import SearchInput from '../../lib/inputs/SearchInput'
import Button from '../../lib/buttons/ButtonFactory'
import { Link } from 'react-router'
import MoviesList from '../components/MoviesList'
import { getMovies } from '../store/actions'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAllMovies } from '../store/selectors'
import Loader from '../../lib/loaders/Loader'

import useSearchFilters from '../../shared/hooks/searchFilters'

export default function Movies() {
    const [showFilter, setShowFilters] = useState(false)
    const dispatch = useAppDispatch()
    const { resources, loading, params: moviesParams } = useAppSelector(getAllMovies)

    const { params, updateParam } = useSearchFilters(moviesParams)

    useEffect(() => {
        dispatch(getMovies(params))
    }, [dispatch, params])

    function onShowFilter() {
        setShowFilters(!showFilter)
    }

    return (
        <>
            <div className='my-3'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl'>Movies List</h1>
                    <Button.Primary>
                        <Link to='/movies/new'>Add movie</Link>
                    </Button.Primary>
                </div>

                <div className='flex lg:w-1/2 md:w-3/5 w-full my-2 justify-between'>
                    <div className='w-full'>
                        <SearchInput
                            initialValue={moviesParams.name}
                            searchHandler={value => updateParam('name', value)}
                            placeholder='Inception'
                            label='Name'
                        />
                    </div>
                    <div className='w-1/4'>
                        <Button.Secondary onClick={onShowFilter}>
                            {!showFilter ? 'More filters' : 'Less filters'}
                        </Button.Secondary>
                    </div>
                </div>

                {showFilter ? (
                    <>
                        <div className='flex flex-col lg:w-1/2 md:w-3/5 w-full space-y-3 items-center'>
                            <div className='w-full'>
                                <SearchInput
                                    initialValue={moviesParams.director}
                                    searchHandler={value => updateParam('director', value)}
                                    placeholder='Christopher Nolan'
                                    label='Director'
                                />
                            </div>
                            <div className='w-full'>
                                <SearchInput
                                    initialValue=''
                                    searchHandler={value => updateParam('year', value)}
                                    placeholder='Exact year match e.g 1990'
                                    type='number'
                                    label='Year'
                                />
                            </div>
                            <div className='w-full'>
                                <SearchInput
                                    initialValue=''
                                    searchHandler={value => updateParam('averageRating', value)}
                                    placeholder='Exact rate match e.g 1'
                                    type='number'
                                    label='Rating'
                                />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
            <div className='relative'>
                {loading ? <Loader /> : null}
                <MoviesList movies={resources} />
            </div>
        </>
    )
}
