import { Link } from 'react-router'
import Button from '../../lib/buttons/ButtonFactory'
import { Movie } from '../types/Movies'
import DeleteMovie from '../containers/DeleteMovie'
import Card from '../../lib/cards/Card'
import StarRating from '../../lib/ratings/StarRating'

interface MoviesListProps {
    movies: Movie[]
}

export default function MoviesList({ movies }: MoviesListProps) {
    return (
        <>
            {movies.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 text-center gap-4 mb-4 md:mb-6'>
                    {movies.map(m => (
                        <Card>
                            <div className='flex flex-col'>
                                <h1 className='max-w-full break-words overflow-hidden text-ellipsis text-lg mb-2'>
                                    {m.name}
                                </h1>
                                <p className='text-base font-light leading-[1.5] italic'>
                                    {m.director}
                                </p>
                                <p>{m.year}</p>
                            </div>
                            <div>
                                <StarRating rating={m.averageRating} />
                            </div>
                            <div className='grid grid-cols-2 space-x-2'>
                                <div className='block w-full'>
                                    <Link className='grid' to={`/movies/${m.id}/edit`}>
                                        <Button.Secondary>EDIT</Button.Secondary>
                                    </Link>
                                </div>
                                <DeleteMovie id={m.id} />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className='flex items-center text-white justify-center min-h-[calc(100vh-300px)] text-3xl'>
                    No movies were found
                </div>
            )}
        </>
    )
}
