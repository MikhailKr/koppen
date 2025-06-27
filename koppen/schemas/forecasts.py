from datetime import datetime
from pydantic import BaseModel


class HourlyUnits(BaseModel):
    time: str
    wind_speed_10m: str
    wind_speed_80m: str
    temperature_2m: str
    temperature_80m: str
    pressure_msl: str


class HourlyData(BaseModel):
    time: list[datetime]
    wind_speed_10m: list[float]
    wind_speed_80m: list[float]
    temperature_2m: list[float]
    temperature_80m: list[float]
    pressure_msl: list[float]


class WeatherResponse(BaseModel):
    latitude: float
    longitude: float
    generationtime_ms: float
    utc_offset_seconds: int
    timezone: str
    timezone_abbreviation: str
    elevation: float
    hourly_units: HourlyUnits
    hourly: HourlyData
