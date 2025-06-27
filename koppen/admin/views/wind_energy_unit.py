from sqladmin import ModelView

from models.wind_energy_unit import (
    Location,
    WindFarm,
    WindTurbine,
    PowerCurve,
    WindTurbineFleet,
)


class WindTurbineAdmin(ModelView, model=WindTurbine):
    column_list = [
        WindTurbine.id,
        WindTurbine.hub_height,
        WindTurbine.nominal_power,
        WindTurbine.turbine_type,
    ]


class PowerCurveAdmin(ModelView, model=PowerCurve):
    column_list = [
        PowerCurve.id,
        # PowerCurve.wind_speed,
        # PowerCurve.value,
    ]
    # name = "Wind Energy Unit"


class WindTurbineFleetAdmin(ModelView, model=WindTurbineFleet):
    column_list = [
        WindTurbineFleet.id,
        WindTurbineFleet.number_of_turbines,
        # WindTurbine.hub_height,
        # WindTurbine.nominal_power,
        # WindTurbine.turbine_type,
    ]


class WindFarmAdmin(ModelView, model=WindFarm):
    column_list = [WindFarm.id, WindFarm.name, WindFarm.description]


class LocationAdmin(ModelView, model=Location):
    column_list = [Location.id, Location.longitude, Location.latitude]
