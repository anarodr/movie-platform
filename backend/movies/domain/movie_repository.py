from abc import ABC, abstractmethod
from typing import List, Optional
from movies.domain.movie import Movie
from movies.domain.value_objects.movie_name import MovieName
from movies.domain.value_objects.movie_director import MovieDirector
from movies.domain.value_objects.movie_year import MovieYear
from movies.domain.value_objects.movie_average_rating import MovieAverageRating
from shared.domain.value_objects.id import ID


class MovieRepository(ABC):
    @abstractmethod
    def find_all(
        self,
        name: Optional[MovieName] = None,
        director: Optional[MovieDirector] = None,
        year: Optional[MovieYear] = None,
        averageRating: Optional[MovieAverageRating] = None,
    ) -> List[Movie]:
        pass

    @abstractmethod
    def find_by_id(self, id: ID) -> Optional[Movie]:
        pass

    @abstractmethod
    def save(self, movie: Movie) -> None:
        pass

    @abstractmethod
    def delete(self, id: ID) -> None:
        pass

    @abstractmethod
    def count_movies(self) -> int:
        pass
