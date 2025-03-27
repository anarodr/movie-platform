import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
}

export default function Card({ children }: CardProps) {
    return (
        <div className='font-[Poppins] flex flex-col justify-between items-center text-white bg-white/10 shadow-[inset_0_1px_0_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.1)]  border border-white/30 rounded-lg px-8 py-4'>
            {children}
        </div>
    )
}
