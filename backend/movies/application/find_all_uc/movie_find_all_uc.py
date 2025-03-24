from movies.domain.movie_repository import MovieRepository
from movies.domain.value_objects.movie_name import MovieName
from movies.domain.value_objects.movie_director import MovieDirector
from movies.domain.value_objects.movie_year import MovieYear
from movies.application.movie_response import MovieResponse
from movies.domain.value_objects.movie_average_rating import MovieAverageRating
from typing import List
from movies.application.find_all_uc.movie_find_all_request import MovieFindAllRequest


class MovieFindAllUC:
    def __init__(self, repository: MovieRepository):
        self.repository = repository

    def invoke(
        self,
        request: MovieFindAllRequest,
    ) -> List[MovieResponse]:

        # Validate inputs
        name = MovieName.create(value=request.name) if request.name else None
        director = (
            MovieDirector.create(value=request.director) if request.director else None
        )
        year = MovieYear.create(value=request.year) if request.year else None
        averageRating = (
            MovieAverageRating.create(value=request.averageRating)
            if request.averageRating
            else None
        )

        # Query into database
        movies = self.repository.find_all(
            name=name, director=director, year=year, averageRating=averageRating
        )

        return [MovieResponse.from_movie(movie) for movie in movies]
