from pydantic import BaseModel


class MovieSaveRequest(BaseModel):
    id: str
    name: str
    director: str
    year: int
    averageRating: int
