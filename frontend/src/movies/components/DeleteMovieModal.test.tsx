import { render, screen, fireEvent } from '@testing-library/react'
import DeleteMovieModal from './DeleteMovieModal'
import { expect, vi } from 'vitest'

// Mock handlers
const openDialogHandlerMock = vi.fn()
const removeMovieHandlerMock = vi.fn()

describe('DeleteMovieModal', () => {
    beforeEach(() => {
        // Render the modal before each test
        render(
            <DeleteMovieModal
                openDialogHandler={openDialogHandlerMock}
                removeMovieHandler={removeMovieHandlerMock}
            />,
        )
    })

    test('renders the modal content', () => {
        // Check that the modal title is rendered
        expect(screen.getByText(/delete movie/i)).toBeInTheDocument()

        // Check the confirmation text
        expect(
            screen.getByText(/are you sure you want to delete this movie\?/i),
        ).toBeInTheDocument()

        // Check the buttons are rendered
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    test('calls removeMovieHandler when Delete button is clicked', () => {
        // Find the "Delete" button and click it
        fireEvent.click(screen.getByRole('button', { name: /delete/i }))

        // Ensure the removeMovieHandler mock function was called
        expect(removeMovieHandlerMock).toHaveBeenCalledTimes(1)
    })

    test('calls openDialogHandler when Cancel button is clicked', () => {
        // Find the "Cancel" button and click it
        fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

        // Ensure the openDialogHandler mock function was called
        expect(openDialogHandlerMock).toHaveBeenCalledTimes(1)
    })
})
