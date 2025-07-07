from pydantic import BaseModel, Field
from datetime import time
from models.forecast import TimeResolutionEnum


class LocationDB(BaseModel):
    id: int
    longitude: float
    latitude: float


class LocationUpdate(BaseModel):
    longitude: float
    latitude: float


class LocationRetrive(BaseModel):
    longitude: float
    latitude: float


class WindFarmUpdate(BaseModel):
    name: str | None
    description: str | None
    location: LocationUpdate | None


class LocationCreate(BaseModel):
    longitude: float
    latitude: float


class WindFarmForecastCreate(BaseModel):
    time_resolution: TimeResolutionEnum
    repeat_daily: bool = False
    daily_time: time | None = None
    repeat_hourly: bool = False
    hourly_minute: int | None = None

    class Config:
        orm_mode = True


class WindTurbineFleetCreate(BaseModel):
    number_of_turbines: int
    wind_turbine_id: int


class WindFarmCreate(BaseModel):
    name: str
    description: str
    location: LocationCreate
    # user_id: int
    forecasts: list[WindFarmForecastCreate]
    wind_turbine_fleet: list[WindTurbineFleetCreate]


class ForecastDB(BaseModel):
    time_resolution: TimeResolutionEnum
    repeat_daily: bool = False
    daily_time: time | None = None
    repeat_hourly: bool = False
    hourly_minute: int | None = None
    wind_farm_id: int

    class Config:
        orm_mode = True
        use_enum_values = True  # Ensures enum values are shown in OpenAPI/Swagger


class PowerCurveDB(BaseModel):
    id: int
    wind_speed_value_map: dict[float, float]


class PowerCurveCreate(BaseModel):
    wind_speed_value_map: dict[float, float]


class PowerCurveUpdate(BaseModel):
    wind_speed_value_map: dict[float, float]


class WindTurbineDB(BaseModel):
    id: int
    hub_height: float
    turbine_type: str
    nominal_power: float
    power_curve: PowerCurveDB | None


class WindTurbineCreate(BaseModel):
    hub_height: float = Field(..., alias="hubHeight")
    turbine_type: str = Field(..., alias="turbineType")
    nominal_power: float = Field(..., alias="nominalPower")
    power_curve_id: int = Field(..., alias="powerCurveId")

    class Config:
        populate_by_name = True


class WindTurbineUpdate(BaseModel):
    hub_height: float | None = None
    turbine_type: str | None = None
    nominal_power: float | None = None
    power_curve_id: int | None = None


class WindTurbineFleetDB(BaseModel):
    id: int
    number_of_turbines: int
    wind_turbine: WindTurbineDB | None = None

    class Config:
        orm_mode = True


class WindTurbineFleetUpdate(BaseModel):
    number_of_turbines: int | None = None
    wind_turbine_id: int | None = None


class WindFarmDB(BaseModel):
    id: int
    name: str
    description: str
    location: LocationDB
    wind_turbine_fleet: list[WindTurbineFleetDB]
    forecasts: list[ForecastDB]

    class Config:
        orm_mode = True
