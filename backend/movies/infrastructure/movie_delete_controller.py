from fastapi import APIRouter, Depends
from movies.domain.movie_repository import MovieRepository
from dependencies import get_movie_repo
from movies.application.delete_uc.movie_delete_uc import MovieDeleteUC
from movies.application.delete_uc.movie_delete_request import MovieDeleteRequest


router = APIRouter()


@router.delete("/{movie_id}", response_model=dict)
def invoke(movie_id: str, repository: MovieRepository = Depends(get_movie_repo)):
    MovieDeleteUC(repository).invoke(MovieDeleteRequest(id=movie_id))
    return {"message": "Movie deleted successfully"}
