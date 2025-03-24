import os

from movies.infrastructure.mongodb_movie_repository import MongoMovieRepository
from movies.domain.movie_repository import MovieRepository


db_url = os.getenv("MONGODB_URL", "mongodb://root:rootpassword@mongodb:27017")
db_name = os.getenv("MONGODB_DB_NAME", "movieplatformdb?authSource=admin")

# Create instance of MongoMovieRepository
movie_repo = MongoMovieRepository(
    db_url=db_url,
    db_name=db_name,
    collection_name="movies",
)


# Function to inject the same instance
def get_movie_repo() -> MovieRepository:
    return movie_repo
