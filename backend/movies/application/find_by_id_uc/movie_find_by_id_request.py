from pydantic import BaseModel


class MovieFindByIDRequest(BaseModel):
    id: str
