import pytest
import os
from pymongo import MongoClient
from movies.domain.movie import Movie
from shared.domain.value_objects.id import ID
from movies.infrastructure.mongodb_movie_repository import MongoMovieRepository

db_url_testing = os.getenv(
    "MONGODB_URL_FOR_TESTING", "mongodb://root:rootpassword@localhost:27017/"
)
db_name_testing = os.getenv("MONGODB_DB_NAME_FOR_TESTING", "movieplatformdb")


@pytest.fixture(scope="module")
def mongo_client():
    client = MongoClient(db_url_testing)
    return client


@pytest.fixture(scope="module")
def mongo_repo(mongo_client):
    repo = MongoMovieRepository(
        db_url=db_url_testing, db_name=db_name_testing, collection_name="movies"
    )
    return repo


@pytest.fixture(scope="function", autouse=True)
def cleanup_db(mongo_client):
    db = mongo_client["movieplatformdb"]
    db["movies"].delete_many({})
    yield
    db["movies"].delete_many({})


def test_save_movie(mongo_repo):
    # Arrange
    movie = Movie.create(
        "162e77df-0e4d-4257-8755-fdb4385e0bee",
        "Inception",
        "Christopher Nolan",
        2010,
        4,
    )

    # Act
    mongo_repo.save(movie)

    # Assert
    saved_movie = mongo_repo.find_by_id(movie.id)
    assert saved_movie is not None
    assert saved_movie.id.value == movie.id.value
    assert saved_movie.name.value == movie.name.value
    assert saved_movie.director.value == movie.director.value
    assert saved_movie.year.value == movie.year.value
    assert saved_movie.averageRating.value == movie.averageRating.value


def test_find_movie_by_id_not_found(mongo_repo):
    # Arrange
    non_existing_id = ID.create("e78f6ff5-5824-49b4-9db7-c66574c1c13e")

    # Act
    result = mongo_repo.find_by_id(non_existing_id)

    # Assert
    assert result is None


def test_find_movie_by_id_found(mongo_repo):
    # Arrange
    movie = Movie.create(
        "162e77df-0e4d-4257-8755-fdb4385e0bee",
        "Inception",
        "Christopher Nolan",
        2010,
        3,
    )
    mongo_repo.save(movie)

    # Act
    saved_movie = mongo_repo.find_by_id(movie.id)

    # Assert
    assert saved_movie is not None
    assert saved_movie.id.value == movie.id.value


def test_find_all_movies_with_filter(mongo_repo):
    # Arrange
    movie1 = Movie.create(
        "1b4e7b1b-c4ae-46d1-82a0-cc91fe3ac274",
        "Inception",
        "Christopher Nolan",
        2010,
        2,
    )
    movie2 = Movie.create(
        "2d59c0de-cb8a-4043-bd9f-b053e1db5029",
        "Interstellar",
        "Christopher Nolan",
        2014,
        1,
    )
    movie3 = Movie.create(
        "3e98f897-b52d-4a4a-a93f-96a731f356dd",
        "The Prestige",
        "Christopher Nolan",
        2006,
        4,
    )
    mongo_repo.save(movie1)
    mongo_repo.save(movie2)
    mongo_repo.save(movie3)

    # Act
    filtered_movies = mongo_repo.find_all(name="Inception")

    # Assert
    assert len(filtered_movies) == 1
    assert filtered_movies[0].name.value == movie1.name.value


def test_delete_movie(mongo_repo):
    # Arrange
    movie = Movie.create(
        "162e77df-0e4d-4257-8755-fdb4385e0bee",
        "Inception",
        "Christopher Nolan",
        2010,
        5,
    )
    mongo_repo.save(movie)

    # Act
    mongo_repo.delete(movie.id)

    # Assert
    deleted_movie = mongo_repo.find_by_id(movie.id)
    assert deleted_movie is None


def test_count_movies(mongo_repo):
    # Arrange
    movie1 = Movie.create(
        "1b4e7b1b-c4ae-46d1-82a0-cc91fe3ac274",
        "Inception",
        "Christopher Nolan",
        2010,
        4,
    )
    movie2 = Movie.create(
        "2d59c0de-cb8a-4043-bd9f-b053e1db5029",
        "Interstellar",
        "Christopher Nolan",
        2014,
        5,
    )
    mongo_repo.save(movie1)
    mongo_repo.save(movie2)

    # Act
    count = mongo_repo.count_movies()

    # Assert
    assert count == 2
