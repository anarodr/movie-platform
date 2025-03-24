from pydantic import BaseModel


class MovieDeleteRequest(BaseModel):
    id: str
