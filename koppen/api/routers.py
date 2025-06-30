# app/api/routers.py
from fastapi import APIRouter

from api.endpoints import forecast_router
from api.endpoints import wind_energy_unit_router
from api.endpoints import auth_router
# from api.endpoints import auth_router
# from api.endpoints import main_page_router

main_router = APIRouter()
main_router.include_router(
    wind_energy_unit_router, prefix="/wind-energy-units", tags=["Wind Energy Units"]
)
main_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
main_router.include_router(forecast_router, prefix="/forecast", tags=["Forecasts"])
# main_router.include_router(main_page_router, prefix="", tags=["Main Page"])
