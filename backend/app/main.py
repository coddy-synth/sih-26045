from fastapi import FastAPI

from app.api import health
from app.api.auth import router as auth_router
from app.api.formulation import router as formulation_router
from app.api.tkdl import router as tkdl_router
from app.db import engine
from app import models

models.Base.metadata.create_all(bind=engine)

def create_app() -> FastAPI:
    app = FastAPI(title="SIH 2026 Patent Formulation API", version="0.1.0")

    app.include_router(health.router)
    app.include_router(auth_router)
    app.include_router(formulation_router)
    app.include_router(tkdl_router)

    @app.get("/")
    def root():
        return {"message": "SIH 2026 Patent Formulation API is running"}

    return app


app = create_app()
