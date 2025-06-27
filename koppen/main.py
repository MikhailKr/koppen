from enum import Enum
from fastapi import FastAPI, Query, Form
from fastapi.staticfiles import StaticFiles
import uvicorn
from sqladmin import Admin
from core.config import settings

# from api.meeting_room import router
from api.routers import main_router
from fastapi.middleware.cors import CORSMiddleware

from admin.views.wind_energy_unit import (
    PowerCurveAdmin,
    WindFarmAdmin,
    WindTurbineAdmin,
    WindTurbineFleetAdmin,
    LocationAdmin,
)
from core.db import AsyncSessionLocal

ADMIN_APP_VIEWS = [
    WindTurbineAdmin,
    PowerCurveAdmin,
    WindFarmAdmin,
    WindTurbineFleetAdmin,
    LocationAdmin,
]
app = FastAPI(title=settings.app_title)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development only!)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


def create_admin(app: FastAPI) -> None:
    admin = Admin(
        app=app,
        session_maker=AsyncSessionLocal,
        # authentication_backend=authentication_backend,
        title="Wind energy forecaster",
    )
    for view in ADMIN_APP_VIEWS:
        admin.add_view(view)


create_admin(app)

app.include_router(main_router)



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
