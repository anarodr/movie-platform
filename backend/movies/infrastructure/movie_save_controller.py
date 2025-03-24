from fastapi import APIRouter, Depends
from movies.domain.movie_repository import MovieRepository
from dependencies import get_movie_repo
from movies.application.movie_response import MovieResponse
from movies.application.save_uc.movie_save_uc import MovieSaveUC
from movies.application.save_uc.movie_save_request import MovieSaveRequest

router = APIRouter()


@router.post("/", response_model=MovieResponse)
def invoke(
    movieRequest: MovieSaveRequest,
    repository: MovieRepository = Depends(get_movie_repo),
):
    return MovieSaveUC(repository).invoke(movieRequest)
