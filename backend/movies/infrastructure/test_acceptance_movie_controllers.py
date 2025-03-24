import pytest
import httpx

BASE_URL = "http://localhost:8000/movies"


@pytest.mark.asyncio
async def test_create_and_filter_movies():
    # Test data for three different movies
    movies_data = [
        {
            "id": "4bf38db3-bdaf-41c9-9f04-92dc9ec99084",
            "name": "The Matrix",
            "director": "Wachowski Brothers",
            "year": 1999,
            "averageRating": 5
        },
        {
            "id": "091d3cac-1939-4aab-9ebd-ab4425ba6771",
            "name": "Inception",
            "director": "Christopher Nolan",
            "year": 2010,
            "averageRating": 2
        },
        {
            "id": "3d341570-ed98-4369-b279-9f23e4861637",
            "name": "Interstellar",
            "director": "Christopher Nolan",
            "year": 2014,
            "averageRating": 3
        }
    ]

    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        try:
            # Step 1: Create movies using POST /movies/
            for movie in movies_data:
                response = await client.post("/", json=movie)
                assert response.status_code == 200

            # Step 2: Retrieve only movies directed by Christopher Nolan
            response = await client.get("/", params={"director": "Christopher Nolan"})
            assert response.status_code == 200
            movies = response.json()
            assert len(movies) == 2
            movie_names = {movie["name"] for movie in movies}
            assert "Inception" in movie_names
            assert "Interstellar" in movie_names

            # Step 3: Retrieve only the movie "Inception"
            response = await client.get("/", params={"name": "Inception"})
            assert response.status_code == 200
            movies = response.json()
            assert len(movies) == 1
            assert movies[0]["name"] == "Inception"
            assert movies[0]["director"] == "Christopher Nolan"

        finally:
            # Step 4: Delete the created movies using DELETE /movies/{movie_id}
            for movie in movies_data:
                await client.delete(f"/{movie['id']}")

            # Step 5: Verify that all movies were deleted
            response = await client.get("/")
            assert response.status_code == 200
            assert response.json() == []
