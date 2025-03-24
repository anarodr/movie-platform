import { useState } from 'react'

type UpdateParam<T> = <K extends keyof T>(key: K, value: T[K] | '') => void

function useSearchFilters<T>(initialParams: T) {
    const [params, setParams] = useState<T>(initialParams)

    const updateParam: UpdateParam<T> = (key, value) => {
        setParams(prevParams => {
            const newParams = { ...prevParams }

            if (value === '') {
                delete newParams[key]
            } else {
                newParams[key] = value
            }

            return newParams
        })
    }

    return {
        params,
        updateParam,
    }
}

export default useSearchFilters
