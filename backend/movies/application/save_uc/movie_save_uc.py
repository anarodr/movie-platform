from movies.domain.movie import Movie
from movies.domain.movie_repository import MovieRepository
from movies.application.movie_response import MovieResponse
from movies.application.save_uc.movie_save_request import MovieSaveRequest
from shared.domain.exceptions.resource_already_created_exception import (
    ResourceAlreadyCreatedException,
)


class MovieSaveUC:
    def __init__(self, repository: MovieRepository):
        self.repository = repository

    def invoke(
        self,
        request: MovieSaveRequest,
    ) -> MovieResponse:

        # Create the aggregate root and Validate inputs
        movie = Movie.create(
            request.id,
            request.name,
            request.director,
            request.year,
            request.averageRating,
        )

        # Query into database to check if exists
        movieDB = self.repository.find_by_id(movie.id)
        if movieDB:
            raise ResourceAlreadyCreatedException(id=request.id)

        # Insert into the database
        self.repository.save(movie=movie)

        # Return the inserted movie
        return MovieResponse.from_movie(movie=movie)
