from fastapi import FastAPI
import uvicorn
from sqladmin import Admin
from core.config import settings
from core.auth import AdminAuth, SECRET_KEY


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
from admin.views.user import UserAdmin
from starlette.middleware.sessions import SessionMiddleware

ADMIN_APP_VIEWS = [
    WindTurbineAdmin,
    PowerCurveAdmin,
    WindFarmAdmin,
    WindTurbineFleetAdmin,
    LocationAdmin,
    UserAdmin,
]
app = FastAPI(title=settings.app_title)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development only!)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)


def create_admin(app: FastAPI) -> None:
    authentication_backend = AdminAuth(secret_key=SECRET_KEY)
    admin = Admin(
        app=app,
        session_maker=AsyncSessionLocal,
        authentication_backend=authentication_backend,
        title="Wind energy forecaster",
    )
    for view in ADMIN_APP_VIEWS:
        admin.add_view(view)


create_admin(app)

app.include_router(main_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
