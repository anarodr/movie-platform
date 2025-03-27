import { ChangeEvent, useEffect, useRef, useState } from 'react'

interface SearchInputProps {
    initialValue: string | undefined
    placeholder: string
    type?: string
    searchHandler: (value: string) => void
    label: string
}

export default function SearchInput({
    initialValue,
    placeholder,
    type = 'text',
    searchHandler,
    label,
}: SearchInputProps) {
    const [search, setSearch] = useState<string>(initialValue ?? '')
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            searchHandler(event.target.value)
        }, 200)
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <div className='flex rounded-lg'>
            <span className='px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 text-sm  bg-neutral-700 border-neutral-700 text-neutral-400'>
                {label}
            </span>
            <input
                type={type}
                value={search}
                placeholder={placeholder}
                onChange={handleSearch}
                className='py-2 px-3 w-full rounded-e-lg bg-neutral-900 border border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600 
  [&::-webkit-inner-spin-button]:filter [&::-webkit-inner-spin-button]:invert [&::-webkit-inner-spin-button]:brightness-150
  [&::-webkit-outer-spin-button]:filter [&::-webkit-outer-spin-button]:invert [&::-webkit-outer-spin-button]:brightness-150'
            />
        </div>
    )
}
