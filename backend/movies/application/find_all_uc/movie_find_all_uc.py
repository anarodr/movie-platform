from movies.domain.movie_repository import MovieRepository
from movies.application.movie_response import MovieResponse
from typing import List
from movies.application.find_all_uc.movie_find_all_request import MovieFindAllRequest


class MovieFindAllUC:
    def __init__(self, repository: MovieRepository):
        self.repository = repository

    def invoke(
        self,
        request: MovieFindAllRequest,
    ) -> List[MovieResponse]:

        # Query into database
        movies = self.repository.find_all(
            name=request.name,
            director=request.director,
            year=request.year,
            averageRating=request.averageRating,
            fromYear=request.fromYear,
            toYear=request.toYear,
            fromAverageRating=request.fromAverageRating,
            toAverageRating=request.toAverageRating,
        )

        return [MovieResponse.from_movie(movie) for movie in movies]
