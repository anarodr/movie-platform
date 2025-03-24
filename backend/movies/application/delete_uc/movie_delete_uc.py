from movies.domain.movie_repository import MovieRepository
from shared.domain.value_objects.id import ID
from movies.application.delete_uc.movie_delete_request import MovieDeleteRequest


class MovieDeleteUC:
    def __init__(self, repository: MovieRepository):
        self.repository = repository

    def invoke(
        self,
        request: MovieDeleteRequest,
    ) -> None:

        # Validate inputs
        id = ID.create(value=request.id)

        # Delete
        self.repository.delete(id)
        pass
