from pydantic import BaseModel


class MovieUpdateRequest(BaseModel):
    id: str
    name: str
    director: str
    year: int
    averageRating: int
