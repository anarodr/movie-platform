from movies.domain.movie_repository import MovieRepository
from movies.domain.movie import Movie


class MovieProvisionCmd:
    def __init__(self, movie_repo: MovieRepository):
        self.movie_repo = movie_repo

    def invoke(self):
        movies = [
            Movie.create(
                id="b6f9ced3-7c18-4a2e-8e02-fb271d73c2ad",
                name="Inception",
                director="Christopher Nolan",
                year=2010,
                averageRating=4,
            ),
            Movie.create(
                id="6b6c5c5d-7f06-4521-8b4c-a7b5556b1b58",
                name="The Dark Knight",
                director="Christopher Nolan",
                year=2008,
                averageRating=4,
            ),
            Movie.create(
                id="eacd8da6-4dbf-44b5-99dc-a3e178f2f7be",
                name="Interstellar",
                director="Christopher Nolan",
                year=2014,
                averageRating=5,
            ),
        ]

        if self.movie_repo.collection.count_documents({}) == 0:
            for movie in movies:
                self.movie_repo.save(movie)
            print("Movies have been provisioned.")
        else:
            print("Movies already exist in the database.")
