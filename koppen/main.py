from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
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
from admin.views.forecast import ForecastAdmin, ForecastHistoryAdmin

ADMIN_APP_VIEWS = [
    WindTurbineAdmin,
    PowerCurveAdmin,
    WindFarmAdmin,
    WindTurbineFleetAdmin,
    LocationAdmin,
    UserAdmin,
    ForecastAdmin,
    ForecastHistoryAdmin,
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


app.include_router(main_router)
create_admin(app)
app.mount("/static", StaticFiles(directory="static", html=False), name="static")


# Serve index.html for frontend routes
@app.get("/{full_path:path}")
async def serve_spa(full_path: str, request: Request):
    if full_path.startswith("api") or full_path.startswith("admin"):
        raise HTTPException(status_code=404)

    # allowed_prefixes = ["", "login", "main", "add", "farm"]
    # if any(
    #     full_path == prefix or full_path.startswith(f"{prefix}/")
    #     for prefix in allowed_prefixes
    # ):
    return FileResponse("static/index.html", media_type="text/html")

    # raise HTTPException(status_code=404)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
