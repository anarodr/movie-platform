from typing import Optional
from pydantic import BaseModel


class MovieFindAllRequest(BaseModel):
    name: Optional[str] = None
    director: Optional[str] = None
    year: Optional[int] = None
    averageRating: Optional[int] = None
    fromYear: Optional[int] = None
    toYear: Optional[int] = None
    fromAverageRating: Optional[int] = None
    toAverageRating: Optional[int] = None
