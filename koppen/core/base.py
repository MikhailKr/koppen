"""Импорты класса Base и всех моделей для Alembic."""

from core.db import Base  # noqa
from models.wind_energy_unit import WindFarm, WindTurbine, PowerCurve, WindTurbineFleet  # noqa
from models.forecast import Forecast  # noqa
