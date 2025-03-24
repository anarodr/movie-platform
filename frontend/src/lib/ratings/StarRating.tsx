export default function StarRating({ rating = 0.0, max = 5 }) {
    return (
        <div className='flex justify-center'>
            {[...Array(max)].map((_, index) => (
                <svg
                    key={index}
                    className={`h-6 w-6 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path d='M10 15.27L16.18 18l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 3.73L3.82 18z' />
                </svg>
            ))}
        </div>
    )
}
