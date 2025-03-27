from fastapi import APIRouter, Query, Depends
from typing import List, Optional
from movies.application.find_all_uc.movie_find_all_uc import MovieFindAllUC
from movies.domain.movie_repository import MovieRepository
from dependencies import get_movie_repo
from movies.application.movie_response import MovieResponse
from movies.application.find_all_uc.movie_find_all_request import MovieFindAllRequest


router = APIRouter()


@router.get("/", response_model=List[MovieResponse])
def invoke(
    name: Optional[str] = Query(None, description="filter by name"),
    director: Optional[str] = Query(None, description="Filter by director"),
    year: Optional[int] = Query(None, description="Filter by year"),
    averageRating: Optional[int] = Query(None, description="Filter by Average Rating"),
    fromYear: Optional[int] = Query(None, description="Filter from year"),
    toYear: Optional[int] = Query(None, description="Filter to year"),
    fromAverageRating: Optional[int] = Query(
        None, description="Filter from average rating"
    ),
    toAverageRating: Optional[int] = Query(
        None, description="Filter to average rating"
    ),
    movie_repo: MovieRepository = Depends(get_movie_repo),
):
    return MovieFindAllUC(movie_repo).invoke(
        MovieFindAllRequest(
            name=name,
            director=director,
            year=year,
            averageRating=averageRating,
            fromYear=fromYear,
            toYear=toYear,
            fromAverageRating=fromAverageRating,
            toAverageRating=toAverageRating,
        )
    )
