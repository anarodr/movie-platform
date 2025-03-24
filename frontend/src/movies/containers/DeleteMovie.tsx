import { useState } from 'react'
import DeleteMovieModal from '../components/DeleteMovieModal'
import Button from '../../lib/buttons/ButtonFactory'
import { useAppDispatch } from '../../store'
import { deleteOneMovie, getMovies } from '../store/actions'

interface DeleteMovieProps {
    id: string
}

export default function DeleteMovie({ id }: DeleteMovieProps) {
    const [openDialog, setOpenDialog] = useState(false)
    const dispatch = useAppDispatch()

    function onRemoveMovie() {
        const submittedResult = dispatch(deleteOneMovie(id))
        submittedResult.then(() => {
            dispatch(getMovies({}))
        })
        setOpenDialog(false)
    }

    function onOpenDialog() {
        setOpenDialog(!openDialog)
    }

    return (
        <>
            {openDialog ? (
                <DeleteMovieModal
                    openDialogHandler={onOpenDialog}
                    removeMovieHandler={onRemoveMovie}
                />
            ) : null}
            <Button.Secondary onClick={onOpenDialog}>DELETE</Button.Secondary>
        </>
    )
}
