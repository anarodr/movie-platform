import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
}

export default function Card({ children }: CardProps) {
    return (
        <div className='flex flex-col content-between group pt-4 px-4 p-2 bg-white border border-gray-200 shadow-2xs overflow-hidden hover:shadow-lg focus:outline-hidden focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70'>
            {children}
        </div>
    )
}
