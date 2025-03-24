import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import MoviesList from './MoviesList'
import { Movie } from '../types/Movies'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'

// Mock DeleteMovie
vi.mock('../containers/DeleteMovie', () => ({
    default: ({ id }: { id: number }) => <button data-testid={`delete-${id}`}>DELETE</button>,
}))

const mockMovies: Movie[] = [
    {
        id: crypto.randomUUID(),
        name: 'Inception',
        director: 'Christopher Nolan',
        year: 1990,
        averageRating: 4.8,
    },
    {
        id: crypto.randomUUID(),
        name: 'The Matrix',
        director: 'The Wachowskis',
        year: 1991,
        averageRating: 4.7,
    },
]

describe('MoviesList Component', () => {
    test('show message when there are no movies', () => {
        render(
            <BrowserRouter>
                <MoviesList movies={[]} />
            </BrowserRouter>,
        )

        expect(screen.getByText(/No movies were found/i)).toBeInTheDocument()
    })

    test('shows movies correctly', () => {
        render(
            <BrowserRouter>
                <MoviesList movies={mockMovies} />
            </BrowserRouter>,
        )

        expect(screen.getByText('Inception')).toBeInTheDocument()
        expect(screen.getByText('Christopher Nolan')).toBeInTheDocument()
        expect(screen.getByText('The Matrix')).toBeInTheDocument()
        expect(screen.getByText('The Wachowskis')).toBeInTheDocument()
    })

    test('edit and delete buttons are present', async () => {
        render(
            <BrowserRouter>
                <MoviesList movies={mockMovies} />
            </BrowserRouter>,
        )

        const editButtons = screen.getAllByText('EDIT')
        expect(editButtons).toHaveLength(mockMovies.length)

        for (const movie of mockMovies) {
            expect(screen.getByTestId(`delete-${movie.id}`)).toBeInTheDocument()
        }
    })

    test('edit button exists and can be clicked', async () => {
        render(
            <BrowserRouter>
                <MoviesList movies={mockMovies} />
            </BrowserRouter>,
        )

        const editButton = screen.getAllByText('EDIT')[0]
        await userEvent.click(editButton)

        expect(editButton).toBeVisible()
    })
})
