from movies.domain.movie_repository import MovieRepository
from shared.domain.value_objects.id import ID
from movies.application.movie_response import MovieResponse
from shared.domain.exceptions.resource_not_found_exception import (
    ResourceNotFoundException,
)
from movies.application.find_by_id_uc.movie_find_by_id_request import (
    MovieFindByIDRequest,
)


class MovieFindByIDUC:
    def __init__(self, repository: MovieRepository):
        self.repository = repository

    def invoke(
        self,
        request: MovieFindByIDRequest,
    ) -> MovieResponse:

        # Validate inputs
        id = ID.create(value=request.id)

        # Query into database
        movie = self.repository.find_by_id(id=id)
        if not movie:
            raise ResourceNotFoundException(id=id.value)
        return MovieResponse.from_movie(movie=movie)
