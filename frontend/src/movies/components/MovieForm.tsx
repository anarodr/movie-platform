import { Form, Formik, FormikHelpers } from 'formik'
import { Movie } from '../types/Movies'
import * as Yup from 'yup'
import FormikField from '../../lib/inputs/FormikField'
import Button from '../../lib/buttons/ButtonFactory'
import Loader from '../../lib/loaders/Loader'

interface MovieFormProps {
    submitHandler: (values: Movie, formikHelpers: FormikHelpers<Movie>) => void
    initialValues: Movie
}

export default function MovieForm({ submitHandler, initialValues }: MovieFormProps) {
    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-5 sm:p-10'>
            <Formik<Movie>
                enableReinitialize={true}
                initialValues={initialValues}
                validateOnMount
                validationSchema={MovieForm.schema}
                onSubmit={submitHandler}>
                {({ isSubmitting, isValid }) => (
                    <>
                        <Form className='space-y-6'>
                            <FormikField type={'text'} label='Movie name*' name='name' />
                            <FormikField name={'director'} type={'text'} label='Director*' />
                            <FormikField name={'year'} type={'number'} label='Year*' />
                            <FormikField
                                name={'averageRating'}
                                type={'number'}
                                label='Average Rating*'
                            />
                            <div className='grid'>
                                <Button.Primary disabled={!isValid || isSubmitting} submitType>
                                    Submit
                                </Button.Primary>
                            </div>
                        </Form>
                        {isSubmitting && <Loader />}
                    </>
                )}
            </Formik>
        </div>
    )
}

const DENY_WHITE_CHARACTERS = /(^\s|\s$)/

MovieForm.schema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be longer than 2 characters')
        .max(64, 'Name must be shorter than 64 characters')
        .test(
            'deny-white-characters',
            'Site Name must not start or end with spaces or tabs',
            (value: string | undefined) => !DENY_WHITE_CHARACTERS.test(value as string),
        )
        .required('Name is required'),
    director: Yup.string()
        .min(3, 'Director must be longer than 2 characters')
        .max(64, 'Director must be shorter than 64 characters')
        .required('Director is required'),
    year: Yup.number()
        .min(3, 'Year must not be less than 1800')
        .max(2030, 'Year must not be greater than 2030')
        .required('Year is required'),
    averageRating: Yup.number()
        .min(1, 'Average Rating must be greater than 1')
        .max(5, 'Average Rating must be less than 5')
        .required('Average Rating is required'),
})
