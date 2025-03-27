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
            <div className='mx-5 my-4'>
                <div className='flex flex-col justify-center items-center'>
                    <div className=''>
                        <h1 className='w-max text-5xl tracking-wide mb-8 bg-gradient-to-r from-[#0075ba] via-green-500 to-[#fae282] bg-clip-text text-transparent'>
                            Movies List
                        </h1>
                    </div>
                    <Button.Primary>
                        <Link to='/movies/new'>Add movie</Link>
                    </Button.Primary>
                </div>

                <div className=''>
                    <Button.Secondary onClick={onShowFilter}>
                        {!showFilter ? 'MORE FILTERS' : 'LESS FILTERS'}
                    </Button.Secondary>
                </div>
                <div className='flex lg:w-1/2 md:w-4/5 w-full my-5 gap-2 justify-between'>
                    <div className='w-full'>
                        <SearchInput
                            initialValue={moviesParams.name}
                            searchHandler={value => updateParam('name', value)}
                            placeholder='Inception'
                            label='Name'
                        />
                    </div>
                </div>

                {showFilter ? (
                    <>
                        <div className='flex flex-col lg:w-1/2 md:w-4/5 w-full space-y-3 items-center'>
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
                <div className='relative mt-4'>
                    {loading ? <Loader /> : null}
                    <MoviesList movies={resources} />
                </div>
            </div>
        </>
    )
}
