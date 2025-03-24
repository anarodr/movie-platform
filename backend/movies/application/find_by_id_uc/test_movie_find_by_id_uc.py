from unittest.mock import MagicMock
from movies.application.find_by_id_uc.movie_find_by_id_uc import MovieFindByIDUC
from movies.application.find_by_id_uc.movie_find_by_id_request import (
    MovieFindByIDRequest,
)
from movies.application.movie_response import MovieResponse
from movies.domain.movie import Movie


def test_movie_find_by_id_success():
    # Arrange
    req = MovieFindByIDRequest(id="162e77df-0e4d-4257-8755-fdb4385e0bee")

    r = MagicMock().find_by_id = MagicMock()
    r.find_by_id.return_value = Movie.create(
        id="162e77df-0e4d-4257-8755-fdb4385e0bee",
        name="Inception",
        director="Christopher Nolan",
        year=2010,
        averageRating=5,
    )

    # Act
    uc = MovieFindByIDUC(repository=r)
    response = uc.invoke(req)

    # Assert
    assert isinstance(response, MovieResponse)
    assert response.id == "162e77df-0e4d-4257-8755-fdb4385e0bee"
    assert response.name == "Inception"
    assert response.director == "Christopher Nolan"
    assert response.year == 2010
    assert response.averageRating == 5
