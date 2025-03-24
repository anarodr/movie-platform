import { useField } from 'formik'
import { useState } from 'react'

interface FormikFieldProps {
    label: string
    name: string
    type: string
}

export default function FormikField({ label, name, type }: FormikFieldProps) {
    const [field, meta] = useField(name)

    // Show inline feedback if EITHER
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = useState(false)
    const handleFocus = () => setDidFocus(true)
    const showFeedback = !!didFocus || meta.touched

    return (
        <div>
            <div className='flex items-center space-between'>
                <label className='font-semibold' htmlFor={name}>
                    {label}
                </label>{' '}
            </div>
            <input
                type={type}
                id={name}
                {...field}
                className={
                    'block w-full rounded-md outline bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-pink-500 sm:text-sm/6'
                }
                onFocus={handleFocus}
            />
            {showFeedback ? (
                <div className='text-sm text-red-500'>{meta.error ? meta.error : null}</div>
            ) : null}
        </div>
    )
}
