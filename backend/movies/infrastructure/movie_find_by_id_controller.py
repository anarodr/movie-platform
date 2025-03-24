from fastapi import APIRouter, Depends
from movies.domain.movie_repository import MovieRepository
from movies.application.movie_response import MovieResponse
from movies.application.find_by_id_uc.movie_find_by_id_uc import MovieFindByIDUC
from dependencies import get_movie_repo
from movies.application.find_by_id_uc.movie_find_by_id_request import (
    MovieFindByIDRequest,
)

router = APIRouter()


@router.get("/{movie_id}", response_model=MovieResponse)
def invoke(movie_id: str, movie_repo: MovieRepository = Depends(get_movie_repo)):
    return MovieFindByIDUC(movie_repo).invoke(MovieFindByIDRequest(id=movie_id))
