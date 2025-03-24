import { FormikHelpers } from 'formik'

import MovieForm from '../components/MovieForm'
import { Movie } from '../types/Movies'
import { Link } from 'react-router'
import { useAppDispatch } from '../../store'
import { createMovie } from '../store/actions'
import Button from '../../lib/buttons/ButtonFactory'
import { toast } from 'react-toastify'

export default function CreateMovie() {
    const dispatch = useAppDispatch()
    async function onSubmitMovie(values: Movie, { setSubmitting }: FormikHelpers<Movie>) {
        const movieToSave: Movie = {
            ...values,
            id: crypto.randomUUID(),
        }

        const submittedResult = await dispatch(createMovie(movieToSave))

        if (createMovie.fulfilled.match(submittedResult)) {
            toast.success('Movie saved successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
        } else {
            toast.error('Error saving the movie!', { autoClose: 5000 })
        }

        setSubmitting(false)
    }

    return (
        <>
            <Button.Secondary>
                <Link to='/movies'>
                    <span>{'< '}</span>
                    BACK TO MOVIES
                </Link>
            </Button.Secondary>
            <MovieForm
                submitHandler={onSubmitMovie}
                initialValues={{ id: '', name: '', director: '', year: 2024, averageRating: 1 }}
            />
        </>
    )
}
