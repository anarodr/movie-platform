from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from dependencies import get_movie_repo
from exception_handler import validation_exception_handler
from movies.infrastructure.movie_find_all_controller import (
    router as movie_find_all_router,
)
from movies.infrastructure.movie_find_by_id_controller import (
    router as movie_find_by_id_router,
)
from movies.infrastructure.movie_save_controller import router as movie_save_router
from movies.infrastructure.movie_update_controller import router as movie_update_router
from movies.infrastructure.movie_delete_controller import router as movie_delete_router
from movies.infrastructure.movie_provision_cmd import MovieProvisionCmd
from shared.domain.exceptions.resource_not_found_exception import (
    ResourceNotFoundException,
)
from shared.domain.exceptions.resource_already_created_exception import (
    ResourceAlreadyCreatedException,
)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register controllers
app.include_router(movie_find_all_router, prefix="/movies", tags=["movies"])
app.include_router(movie_find_by_id_router, prefix="/movies", tags=["movies"])
app.include_router(movie_save_router, prefix="/movies", tags=["movies"])
app.include_router(movie_update_router, prefix="/movies", tags=["movies"])
app.include_router(movie_delete_router, prefix="/movies", tags=["movies"])

app.add_exception_handler(ValidationError, validation_exception_handler)
app.add_exception_handler(ResourceNotFoundException, validation_exception_handler)
app.add_exception_handler(ResourceAlreadyCreatedException, validation_exception_handler)
app.add_exception_handler(ValueError, validation_exception_handler)


# Provision data
@app.on_event("startup")
def provision_db():
    movie_repo = get_movie_repo()
    movie_provision_cmd = MovieProvisionCmd(movie_repo)
    movie_provision_cmd.invoke()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
