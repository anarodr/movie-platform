import Button from '../../lib/buttons/ButtonFactory'
import SearchInput from '../../lib/inputs/SearchInput'
import { useState } from 'react'
import { MovieQueryParams } from '../types/MovieQueryParams'
import { UpdateParam } from '../../shared/hooks/searchFilters'

interface MovieListFiltersProps {
    filterParams: MovieQueryParams
    updateParamHandler: UpdateParam<MovieQueryParams>
}

export default function MovieListFilters({
    filterParams,
    updateParamHandler,
}: MovieListFiltersProps) {
    const [showFilter, setShowFilters] = useState(false)

    function onShowFilter() {
        setShowFilters(!showFilter)
    }

    return (
        <>
            <div className=''>
                <Button.Secondary onClick={onShowFilter}>
                    {!showFilter ? 'MORE FILTERS' : 'LESS FILTERS'}
                </Button.Secondary>
            </div>
            <div className='flex lg:w-1/2 md:w-4/5 w-full my-5 gap-2 justify-between'>
                <div className='w-full'>
                    <SearchInput
                        initialValue={filterParams.name}
                        searchHandler={value => updateParamHandler('name', value)}
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
                                initialValue={filterParams.director}
                                searchHandler={value => updateParamHandler('director', value)}
                                placeholder='Christopher Nolan'
                                label='Director'
                            />
                        </div>
                        <div className='w-full'>
                            <SearchInput
                                initialValue={filterParams.year}
                                searchHandler={value => updateParamHandler('year', value)}
                                placeholder='Exact year match e.g 1990'
                                type='number'
                                label='Year'
                            />
                        </div>
                        <div className='w-full'>
                            <SearchInput
                                initialValue={filterParams.averageRating}
                                searchHandler={value => updateParamHandler('averageRating', value)}
                                placeholder='Exact rate match e.g 1'
                                type='number'
                                label='Rating'
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}
