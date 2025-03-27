import { Link, useParams } from 'react-router'
import MovieForm from '../components/MovieForm'
import { FormikHelpers } from 'formik'
import { Movie } from '../types/Movies'
import { useAppDispatch, useAppSelector } from '../../store'
import { getOneMovie, updateMovie } from '../store/actions'
import { useEffect } from 'react'
import { getMovieDetail } from '../store/selectors'
import Loader from '../../lib/loaders/Loader'
import Button from '../../lib/buttons/ButtonFactory'
import { toast } from 'react-toastify'

export default function EditMovie() {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { data, loading } = useAppSelector(getMovieDetail)

    useEffect(() => {
        if (id) {
            dispatch(getOneMovie(id))
        }
    }, [dispatch, id])

    async function onSubmitMovie(values: Movie, { setSubmitting }: FormikHelpers<Movie>) {
        if (id) {
            const submittedResult = await dispatch(updateMovie({ movie: values }))
            setSubmitting(false)

            if (updateMovie.fulfilled.match(submittedResult)) {
                toast.success('Movie updated successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
            } else {
                toast.error('Error updating the movie!', { autoClose: 5000 })
            }
        }
    }

    return (
        <div className='px-3 py-5'>
            <Button.Secondary>
                <Link to='/movies'>
                    <span>{'< '}</span>
                    BACK TO MOVIES
                </Link>
            </Button.Secondary>
            {loading && <Loader />}
            <MovieForm submitHandler={onSubmitMovie} initialValues={data} />
        </div>
    )
}
