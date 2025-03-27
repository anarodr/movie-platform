export default function Loader() {
    return (
        <div
            className='absolute inset-0 bg-black/70 flex items-center justify-center z-20'
            data-testid='loader'>
            <div className='w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
    )
}
