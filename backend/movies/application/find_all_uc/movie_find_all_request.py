from typing import Optional
from pydantic import BaseModel


class MovieFindAllRequest(BaseModel):
    name: Optional[str] = None
    director: Optional[str] = None
    year: Optional[int] = None
    averageRating: Optional[int] = None
