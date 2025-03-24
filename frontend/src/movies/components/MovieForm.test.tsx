import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MovieForm from './MovieForm'
import { expect, vi } from 'vitest'

// Mock submit handler
const submitHandlerMock = vi.fn()

// Initial values for the form
const initialValues = {
    id: '',
    name: '',
    director: '',
    year: 0,
    averageRating: 0,
}

describe('MovieForm', () => {
    test('renders form fields with initial values', () => {
        render(<MovieForm submitHandler={submitHandlerMock} initialValues={initialValues} />)

        // Check that form fields are rendered
        expect(screen.getByLabelText(/movie name\*/i)).toHaveValue(initialValues.name)
        expect(screen.getByLabelText(/director\*/i)).toHaveValue(initialValues.director)
        expect(screen.getByLabelText(/year\*/i)).toHaveValue(initialValues.year)
        expect(screen.getByLabelText(/average rating\*/i)).toHaveValue(initialValues.averageRating)
    })

    test('submit button gets enabled after filling in valid values', async () => {
        render(<MovieForm submitHandler={submitHandlerMock} initialValues={initialValues} />)

        // Fill in the form with valid data
        fireEvent.change(screen.getByLabelText(/movie name\*/i), { target: { value: 'Inception' } })
        fireEvent.change(screen.getByLabelText(/director\*/i), {
            target: { value: 'Christopher Nolan' },
        })
        fireEvent.change(screen.getByLabelText(/year\*/i), { target: { value: 2010 } })
        fireEvent.change(screen.getByLabelText(/average rating\*/i), { target: { value: 4.5 } })

        // Ensure the Submit button is now enabled
        const submitButton = screen.getByRole('button', { name: /submit/i })
        expect(submitButton).toBeEnabled()
    })

    test('calls submitHandler with correct values when form is valid', async () => {
        render(<MovieForm submitHandler={submitHandlerMock} initialValues={initialValues} />)

        // Fill in the form with valid data
        fireEvent.change(screen.getByLabelText(/movie name\*/i), { target: { value: 'Inception' } })
        fireEvent.change(screen.getByLabelText(/director\*/i), {
            target: { value: 'Christopher Nolan' },
        })
        fireEvent.change(screen.getByLabelText(/year\*/i), { target: { value: 2010 } })
        fireEvent.change(screen.getByLabelText(/average rating\*/i), { target: { value: 4.5 } })

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: /submit/i }))

        // Wait for the submit handler to be called with correct values
        await waitFor(() => expect(submitHandlerMock).toHaveBeenCalledTimes(1))
        expect(submitHandlerMock).toHaveBeenCalledWith(
            {
                id: '',
                name: 'Inception',
                director: 'Christopher Nolan',
                year: 2010,
                averageRating: 4.5,
            },
            expect.any(Object), // FormikHelpers (not the focus here)
        )
    })
})
