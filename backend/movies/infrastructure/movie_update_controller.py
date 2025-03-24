from fastapi import APIRouter, Depends
from movies.domain.movie_repository import MovieRepository
from dependencies import get_movie_repo
from movies.application.movie_response import MovieResponse
from movies.application.update_uc.movie_update_request import MovieUpdateRequest
from movies.application.update_uc.movie_update_uc import MovieUpdateUC


router = APIRouter()


@router.put("/", response_model=MovieResponse)
def invoke(
    movieUpdateRequest: MovieUpdateRequest,
    movie_repo: MovieRepository = Depends(get_movie_repo),
):
    return MovieUpdateUC(movie_repo).invoke(movieUpdateRequest)
