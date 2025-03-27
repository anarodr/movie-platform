import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MovieListFilters from '../components/MovieListFilters'
import { vi } from 'vitest'

describe('MovieListFilters Component', () => {
    const mockUpdateParamHandler = vi.fn()
    const defaultFilterParams = {
        name: '',
        director: '',
        fromYear: '',
        toYear: '',
        fromAverageRating: '',
        toAverageRating: '',
    }

    test('renders search input for name', () => {
        render(
            <MovieListFilters
                filterParams={defaultFilterParams}
                updateParamHandler={mockUpdateParamHandler}
            />,
        )

        expect(screen.getByText('Name')).toBeInTheDocument()
    })

    test('calls updateParamHandler when searching by name', async () => {
        render(
            <MovieListFilters
                filterParams={defaultFilterParams}
                updateParamHandler={mockUpdateParamHandler}
            />,
        )

        const searchInput = screen.getByPlaceholderText('Inception')
        fireEvent.change(searchInput, { target: { value: 'Interstellar' } })

        await waitFor(() => {
            expect(mockUpdateParamHandler).toHaveBeenCalledWith('name', 'Interstellar')
        })
    })

    test('toggles additional filters when button is clicked', () => {
        render(
            <MovieListFilters
                filterParams={defaultFilterParams}
                updateParamHandler={mockUpdateParamHandler}
            />,
        )

        const toggleButton = screen.getByText('MORE FILTERS')
        fireEvent.click(toggleButton)

        expect(screen.getByText('Director')).toBeInTheDocument()
        fireEvent.click(screen.getByText('LESS FILTERS'))

        expect(screen.queryByText('Director')).not.toBeInTheDocument()
    })
})
