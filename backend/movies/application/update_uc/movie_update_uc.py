from movies.domain.movie import Movie
from movies.domain.movie_repository import MovieRepository
from movies.application.update_uc.movie_update_request import MovieUpdateRequest
from movies.application.movie_response import MovieResponse
from shared.domain.exceptions.resource_not_found_exception import (
    ResourceNotFoundException,
)


class MovieUpdateUC:
    def __init__(self, repository: MovieRepository):
        self.repository = repository

    def invoke(
        self,
        request: MovieUpdateRequest,
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
        if not movieDB:
            raise ResourceNotFoundException(id=request.id)

        # Save operation also updates
        self.repository.save(movie=movie)

        # Return the inserted movie
        return MovieResponse.from_movie(movie=movie)
