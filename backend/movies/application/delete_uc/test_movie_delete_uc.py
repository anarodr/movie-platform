import pytest
from unittest.mock import MagicMock
from movies.application.delete_uc.movie_delete_request import MovieDeleteRequest
from movies.application.delete_uc.movie_delete_uc import MovieDeleteUC


def test_movie_delete_success():
    # Arrange
    req = MovieDeleteRequest(id="162e77df-0e4d-4257-8755-fdb4385e0bee")

    r = MagicMock().delete = MagicMock()

    # Act
    uc = MovieDeleteUC(repository=r)
    uc.invoke(req)

    # Assert
    assert r.delete.call_args is not None, "delete was not called"
    called_id = r.delete.call_args[0][0]
    assert called_id.value == "162e77df-0e4d-4257-8755-fdb4385e0bee"


def test_invalid_id():
    # Arrange
    invalid_request = MovieDeleteRequest(id="invalid-uuid")

    r = MagicMock().delete = MagicMock()

    # Act
    with pytest.raises(ValueError):
        uc = MovieDeleteUC(repository=r)
        uc.invoke(invalid_request)

    # Assert
    r.delete.assert_not_called()
