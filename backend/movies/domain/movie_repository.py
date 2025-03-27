from abc import ABC, abstractmethod
from typing import List, Optional
from movies.domain.movie import Movie
from shared.domain.value_objects.id import ID


class MovieRepository(ABC):
    @abstractmethod
    def find_all(
        self,
        name: Optional[str] = None,
        director: Optional[str] = None,
        year: Optional[int] = None,
        averageRating: Optional[int] = None,
        fromYear: Optional[int] = None,
        toYear: Optional[int] = None,
        fromAverageRating: Optional[int] = None,
        toAverageRating: Optional[int] = None,
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
