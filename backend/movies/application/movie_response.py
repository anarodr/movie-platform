from pydantic import BaseModel

from movies.domain.movie import Movie


class MovieResponse(BaseModel):
    id: str
    name: str
    director: str
    year: int
    averageRating: int

    @classmethod
    def from_movie(cls, movie: Movie):
        return cls(
            id=str(movie.id),
            name=str(movie.name),
            director=str(movie.director),
            year=movie.year.to_int(),
            averageRating=movie.averageRating.to_int(),
        )
