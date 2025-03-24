from unittest.mock import MagicMock
from movies.application.save_uc.movie_save_uc import MovieSaveUC
from movies.application.save_uc.movie_save_request import MovieSaveRequest
from movies.application.movie_response import MovieResponse


def test_movie_save_success():
    # Arrange
    req = MovieSaveRequest(
        id="162e77df-0e4d-4257-8755-fdb4385e0bee",
        name="Inception",
        director="Christopher Nolan",
        year=2010,
        averageRating=1,
    )

    r = MagicMock().save = MagicMock()
    r = MagicMock().find_by_id = MagicMock()
    r.find_by_id.return_value = None

    # Act
    uc = MovieSaveUC(repository=r)
    response = uc.invoke(req)

    # Assert
    assert isinstance(response, MovieResponse)
    assert response.id == "162e77df-0e4d-4257-8755-fdb4385e0bee"
    assert response.name == "Inception"
    assert response.director == "Christopher Nolan"
    assert response.year == 2010
    assert response.averageRating == 1
