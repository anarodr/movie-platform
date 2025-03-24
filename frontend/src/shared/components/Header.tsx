import { Link } from 'react-router'

export default function Header() {
    return (
        <nav className='bg-white shadow p-4 flex justify-between items-center'>
            <div className='flex items-center space-x-6'>
                <Link to={'/'}>
                    <div className='text-pink-600 font-bold text-xl'>
                        <span className='text-2xl'>&#8767;</span>
                        <span>🎬 My Movies Platform</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}
