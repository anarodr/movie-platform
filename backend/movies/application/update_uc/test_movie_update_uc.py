from unittest.mock import MagicMock
from movies.application.update_uc.movie_update_uc import MovieUpdateUC
from movies.application.update_uc.movie_update_request import MovieUpdateRequest
from movies.application.movie_response import MovieResponse
from movies.domain.movie import Movie


def test_movie_update_success():
    # Arrange
    req = MovieUpdateRequest(
        id="162e77df-0e4d-4257-8755-fdb4385e0bee",
        name="Inception",
        director="Christopher Nolan",
        year=2010,
        averageRating=1,
    )

    r = MagicMock().save = MagicMock()
    r = MagicMock().find_by_id = MagicMock()
    r.find_by_id.return_value = Movie.create(
        id="162e77df-0e4d-4257-8755-fdb4385e0bee",
        name="Inception",
        director="Christopher Nolan",
        year=2010,
        averageRating=5,
    )

    # Act
    uc = MovieUpdateUC(repository=r)
    response = uc.invoke(req)

    # Assert
    assert isinstance(response, MovieResponse)
    assert response.id == "162e77df-0e4d-4257-8755-fdb4385e0bee"
    assert response.name == "Inception"
    assert response.director == "Christopher Nolan"
    assert response.year == 2010
    assert response.averageRating == 1
