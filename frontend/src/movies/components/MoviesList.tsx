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
                        <Card key={m.id}>
                            <p className='text-xl font-bold'>{m.name}</p>
                            <h3 className='text-gray-500'>{m.director}</h3>
                            <h3 className='text-gray-500'>{m.year}</h3>
                            <StarRating rating={m.averageRating} />

                            <div className='grid grid-cols-2'>
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
                <div className='flex items-center justify-center min-h-[calc(100vh-300px)] text-lg'>
                    No movies were found
                </div>
            )}
        </>
    )
}
