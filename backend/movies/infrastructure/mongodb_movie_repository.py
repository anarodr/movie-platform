from typing import List, Optional, Dict, Union
from pymongo import MongoClient
from movies.domain.movie import Movie
from movies.domain.movie_repository import MovieRepository
from movies.domain.value_objects.movie_name import MovieName
from movies.domain.value_objects.movie_director import MovieDirector
from movies.domain.value_objects.movie_year import MovieYear
from movies.domain.value_objects.movie_average_rating import MovieAverageRating
from shared.domain.value_objects.id import ID


class MongoMovieRepository(MovieRepository):
    def __init__(self, db_url: str, db_name: str, collection_name: str):
        self.client: MongoClient = MongoClient(db_url)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

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
        filters: Dict[str, Union[Dict[str, str], Dict[str, int], int]] = {}

        if name:
            filters["name"] = {
                "$regex": name,
                "$options": "i",
            }  # Case-insensitive search
        if director:
            filters["director"] = {
                "$regex": director,
                "$options": "i",
            }  # Case-insensitive search
        if year:
            filters["year"] = year
        else:
            if fromYear and toYear:
                filters["year"] = {"$gte": fromYear, "$lte": toYear}
            else:
                if fromYear:
                    filters["year"] = {"$gte": fromYear}
                if toYear:
                    filters["year"] = {"$lte": toYear}

        if averageRating:
            filters["averageRating"] = averageRating
        else:
            if fromAverageRating and toAverageRating:
                filters["averageRating"] = {
                    "$gte": fromAverageRating,
                    "$lte": toAverageRating,
                }
            else:
                if toAverageRating:
                    filters["averageRating"] = {"$lte": toAverageRating}
                if fromAverageRating:
                    filters["averageRating"] = {"$gte": fromAverageRating}

        movies_cursor = self.collection.find(filters)
        return [self.from_mongo(movie) for movie in movies_cursor]

    def find_by_id(self, id: ID) -> Optional[Movie]:
        movie_data = self.collection.find_one({"_id": id.value})
        return self.from_mongo(movie_data) if movie_data else None

    def save(self, movie: Movie) -> None:
        movie_dict = movie.dict()
        movie_dict["_id"] = movie.id.value

        self.collection.update_one(
            {"_id": movie_dict["_id"]}, {"$set": movie_dict}, upsert=True
        )

    def delete(self, id: ID) -> None:
        self.collection.delete_one({"_id": id.value})

    def count_movies(self) -> int:
        return self.collection.count_documents({})

    @classmethod
    def from_mongo(cls, data):
        if data:
            data["id"] = ID.create(data.pop("_id"))
            data["name"] = MovieName.create(data["name"])
            data["director"] = MovieDirector.create(data["director"])
            data["year"] = MovieYear.create(data["year"])
            data["averageRating"] = MovieAverageRating.create(data["averageRating"])
            return Movie(**data)
        return None
