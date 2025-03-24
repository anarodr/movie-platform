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
            <span className='px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400'>
                {label}
            </span>
            <input
                type={type}
                value={search}
                placeholder={placeholder}
                onChange={handleSearch}
                className='w-full rounded-e-md  outline bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-pink-500 sm:text-sm/6'
            />
        </div>
    )
}
