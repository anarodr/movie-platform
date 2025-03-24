from movies.infrastructure.mongodb_movie_repository import MongoMovieRepository
from movies.domain.movie_repository import MovieRepository

# Create instance of MongoMovieRepository
movie_repo = MongoMovieRepository(
    db_url="mongodb://root:rootpassword@mongodb:27017/movieplatformdb?authSource=admin",
    db_name="movieplatformdb",
    collection_name="movies",
)


# Function to inject the same instance
def get_movie_repo() -> MovieRepository:
    return movie_repo
