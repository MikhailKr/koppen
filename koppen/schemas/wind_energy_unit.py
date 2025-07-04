from pydantic import BaseModel, Field


class LocationDB(BaseModel):
    id: int
    longitude: float
    latitude: float


class LocationCreate(BaseModel):
    longitude: float
    latitude: float


class LocationUpdate(BaseModel):
    longitude: float
    latitude: float


class WindFarmDB(BaseModel):
    id: int
    name: str
    description: str
    location: LocationDB

    class Config:
        orm_mode = True


class WindFarmCreate(BaseModel):
    name: str
    description: str
    location: LocationCreate


class WindFarmUpdate(BaseModel):
    name: str | None
    description: str | None
    location: LocationUpdate | None


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
    wind_turbine: WindTurbineDB


class WindTurbineFleetCreate(BaseModel):
    number_of_turbines: int
    wind_turbine_id: int


class WindTurbineFleetUpdate(BaseModel):
    number_of_turbines: int | None = None
    wind_turbine_id: int | None = None
