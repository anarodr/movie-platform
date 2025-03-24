from fastapi import Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from shared.domain.exceptions.resource_not_found_exception import (
    ResourceNotFoundException,
)
from shared.domain.exceptions.resource_already_created_exception import (
    ResourceAlreadyCreatedException,
)


def validation_exception_handler(request: Request, exc: Exception) -> Response:
    if isinstance(exc, (RequestValidationError, ValidationError)):
        return JSONResponse(
            status_code=422,
            content={"detail": exc.errors()},
        )

    if isinstance(exc, ValueError):
        return JSONResponse(
            status_code=400,
            content={"detail": str(exc)},
        )

    if isinstance(exc, ResourceNotFoundException):
        return JSONResponse(
            status_code=404,
            content={"detail": exc.errors},
        )

    if isinstance(exc, ResourceAlreadyCreatedException):
        return JSONResponse(
            status_code=409,
            content={"detail": exc.errors},
        )

    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
