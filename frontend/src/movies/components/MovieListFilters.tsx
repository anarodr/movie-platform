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
                        <div className='grid grid-cols-2 w-full gap-2'>
                            <SearchInput
                                initialValue={filterParams.fromYear}
                                searchHandler={value => updateParamHandler('fromYear', value)}
                                placeholder='1800'
                                type='number'
                                label='From year'
                            />
                            <SearchInput
                                initialValue={filterParams.toYear}
                                searchHandler={value => updateParamHandler('toYear', value)}
                                placeholder='2030'
                                type='number'
                                label='To year'
                            />
                        </div>
                        <div className='grid grid-cols-2 w-full gap-2'>
                            <SearchInput
                                initialValue={filterParams.fromAverageRating}
                                searchHandler={value =>
                                    updateParamHandler('fromAverageRating', value)
                                }
                                placeholder='1'
                                type='number'
                                label='From Rating'
                            />
                            <SearchInput
                                initialValue={filterParams.toAverageRating}
                                searchHandler={value =>
                                    updateParamHandler('toAverageRating', value)
                                }
                                placeholder='5'
                                type='number'
                                label='To rating'
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}
