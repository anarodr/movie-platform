import { Link } from 'react-router'
import Button from '../../lib/buttons/ButtonFactory'

export default function Home() {
    return (
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center'>
            <div className='max-w-2xl'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>🎬 Welcome to MovieHub</h1>
                <p className='text-lg md:text-xl text-gray-500 mb-6'>
                    Discover and explore an extensive collection of movies from all genres.
                </p>
                <Button.Primary>
                    <Link to='/movies'>Browse Movies</Link>
                </Button.Primary>
            </div>
        </div>
    )
}
