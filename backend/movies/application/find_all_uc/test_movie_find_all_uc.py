from unittest.mock import MagicMock
from movies.application.find_all_uc.movie_find_all_uc import MovieFindAllUC
from movies.application.find_all_uc.movie_find_all_request import MovieFindAllRequest
from movies.application.movie_response import MovieResponse
from movies.domain.movie import Movie


def test_movie_find_all_success():
    # Arrange
    req = MovieFindAllRequest(
        name="Inception", director="Christopher Nolan", year=2010, averageRating=5
    )

    r = MagicMock().find_all = MagicMock()
    r.find_all.return_value = [
        Movie.create(
            id="162e77df-0e4d-4257-8755-fdb4385e0bee",
            name="Inception",
            director="Christopher Nolan",
            year=2010,
            averageRating=5,
        )
    ]

    # Act
    uc = MovieFindAllUC(repository=r)
    response = uc.invoke(req)

    # Assert
    assert r.find_all.call_args is not None, "find all was not called"

    assert len(response) == 1
    assert isinstance(response[0], MovieResponse)
    assert response[0].name == "Inception"
    assert response[0].director == "Christopher Nolan"
    assert response[0].year == 2010
    assert response[0].averageRating == 5
