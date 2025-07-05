# from .reservation import router as reservation_router
from .wind_energy_unit import router as wind_energy_unit_router

from .auth import router as auth_router
from .forecast import router as forecast_router
# from .main_page import router as main_page_router

__all__ = [
    "wind_energy_unit_router",
    "auth_router",
    "forecast_router",
    # "main_page_router",
]
