from movies.domain.value_objects.movie_name import MovieName
from movies.domain.value_objects.movie_director import MovieDirector
from movies.domain.value_objects.movie_year import MovieYear
from movies.domain.value_objects.movie_average_rating import MovieAverageRating
from shared.domain.value_objects.id import ID


class Movie:

    def __init__(
        self,
        id: ID,
        name: MovieName,
        director: MovieDirector,
        year: MovieYear,
        averageRating: MovieAverageRating,
    ):
        self.id = id
        self.name = name
        self.director = director
        self.year = year
        self.averageRating = averageRating

    @classmethod
    def create(cls, id: str, name: str, director: str, year: int, averageRating: int):
        return cls(
            id=ID.create(id),
            name=MovieName.create(name),
            director=MovieDirector.create(director),
            year=MovieYear.create(year),
            averageRating=MovieAverageRating.create(averageRating),
        )

    def dict(self):
        """Manual serialization method."""
        return {
            "id": self.id.dict(),
            "name": self.name.dict(),
            "director": self.director.dict(),
            "year": self.year.dict(),
            "averageRating": self.averageRating.dict(),
        }

    def __str__(self):
        return f"{self.name.value} ({self.year.value}) - {self.director.value}"
