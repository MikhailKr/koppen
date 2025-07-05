from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api_clients.open_meteo import OpenMeteoAsyncClient
from core.db import get_async_session
from core.auth import get_current_user
from models.wind_energy_unit import WindFarm, WindTurbineFleet, WindTurbine
from schemas.forecasts import WeatherResponse
from sqlalchemy.orm import selectinload
import pandas as pd
import re
from windpowerlib import WindTurbine as WindTurbineWPL
from windpowerlib import WindFarm as WindFarmWPL
from windpowerlib import ModelChain, TurbineClusterModelChain

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/{wind_farm_id}")
async def forecast(
    wind_farm_id: int,
    # forecast_params: ForecastParams,
    session: AsyncSession = Depends(get_async_session),
):
    """
    Steps:
        1. Get weather forecast for the location
        2. Get wind_farm model
        3. Get power output forecast
        4. Return forecast as a dict
    """
    # TODO add check that user is the owner of the wind farm
    stmt = (
        select(WindFarm)
        .options(
            selectinload(WindFarm.location),
            selectinload(WindFarm.wind_turbine_fleet)
            .selectinload(WindTurbineFleet.wind_turbine)
            .selectinload(WindTurbine.power_curve),
        )
        .where(WindFarm.id == wind_farm_id)
    )
    result = await session.execute(stmt)
    wind_farm_obj = result.scalars().first()
    turbines_data = []
    # power_curve = []
    for fleet in wind_farm_obj.wind_turbine_fleet:
        wind_turbine: WindTurbine = fleet.wind_turbine
        ws, pc = [], []
        for wind_speed, power in wind_turbine.power_curve.wind_speed_value_map.items():
            ws.append(float(wind_speed))
            pc.append(power * 1000)

        power_curve = {}
        power_curve["wind_speed"] = ws
        power_curve["value"] = pc

        data = {
            "nominal_power": wind_turbine.nominal_power,
            "hub_height": wind_turbine.hub_height,
            "power_curve": pd.DataFrame(data=power_curve),
        }
        turbines_data.append(data)
    turbine = turbines_data[0]
    my_turbine = WindTurbineWPL(**turbine)
    wind_turbine_fleet = pd.DataFrame(
        {
            "wind_turbine": [my_turbine],  # as windpowerlib.WindTurbine
            "number_of_turbines": [84],
        }
    )
    wind_farm = WindFarmWPL(
        name="example_farm", wind_turbine_fleet=wind_turbine_fleet, efficiency=0.9
    )

    latitude = wind_farm_obj.location.latitude
    longitude = wind_farm_obj.location.longitude
    weather_model = await _get_weather_forecast(latitude, longitude)
    weather_data = await _preprocess_weather_data(weather_model)
    power_output = await get_wind_farm_power_output(wind_farm, weather_data)
    return {"power_output": power_output}


async def _get_weather_forecast(latitude: float, longitude: float) -> WeatherResponse:
    url = "https://api.open-meteo.com/v1/forecast"
    parameters_hourly = [
        "wind_speed_10m",
        "wind_speed_80m",
        "temperature_2m",
        "temperature_80m",
        "pressure_msl",
    ]
    wind_speed_unit = "ms"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": parameters_hourly,
        "wind_speed_unit": wind_speed_unit,
    }
    url = "https://api.open-meteo.com/v1/forecast"

    async with OpenMeteoAsyncClient(cache_path=".cache", expire_after=3600) as client:
        weather_data = await client.fetch_weather(url, params)
    return WeatherResponse(**weather_data)


async def _preprocess_weather_data(weather_model: WeatherResponse):
    """Preprocess weather data to format compatible with windpowerlib"""
    df = pd.DataFrame(weather_model.hourly)
    df = df.set_index(0)
    reshaped = pd.DataFrame({idx: vals for idx, vals in df[1].items()})
    reshaped["time"] = pd.to_datetime(reshaped["time"])
    reshaped = reshaped.set_index("time")
    reshaped.index = reshaped.index.tz_localize("UTC")

    reshaped_weather_data = reshaped.rename(
        columns={
            "wind_speed_10m": "wind_speed_10m",
            "wind_speed_80m": "wind_speed_80m",
            "temperature_2m": "temperature_2m",
            "temperature_80m": "temperature_80m",
            "pressure_msl": "pressure",
        }
    )
    variables = []

    heights = []

    for col in reshaped_weather_data.columns:
        split_col = col.rsplit("_", 1)
        if len(split_col) == 2:  # If column has numerical height
            var, height = split_col
            height = re.sub(r"\D", "", height) if height != "surface" else height
        else:
            var, height = col, "2"  # Default to "surface" if no height

        variables.append(var)
        heights.append(height)

    arrays = [variables, heights]
    reshaped_weather_data.columns = pd.MultiIndex.from_arrays(
        arrays, names=("variable_name", "height")
    )
    reshaped_weather_data["roughness_length", 0] = 0.15
    reshaped_weather_data["pressure"] *= 100
    return reshaped_weather_data


async def get_power_output(turbine, weather):
    modelchain_data = {
        "wind_speed_model": "logarithmic",  # 'logarithmic' (default),
        # 'hellman' or
        # 'interpolation_extrapolation'
        "density_model": "ideal_gas",  # 'barometric' (default), 'ideal_gas'
        #  or 'interpolation_extrapolation'
        "temperature_model": "linear_gradient",  # 'linear_gradient' (def.) or
        # 'interpolation_extrapolation'
        # "power_output_model": "power_coefficient_curve",  # 'power_curve' (default) or
        # 'power_coefficient_curve'
        "density_correction": True,  # False (default) or True
        "obstacle_height": 0,  # default: 0
        "hellman_exp": None,
    }
    mc = ModelChain(turbine, **modelchain_data).run_model(weather)
    return mc.power_output


async def get_wind_farm_power_output(wind_farm, weather):
    modelchain_data = {
        "wake_losses_model": "wind_farm_efficiency",  #
        # 'dena_mean' (default), None,
        # 'wind_farm_efficiency' or name
        #  of another wind efficiency curve
        #  see :py:func:`~.wake_losses.get_wind_efficiency_curve`
        "smoothing": True,  # False (default) or True
        "block_width": 0.5,  # default: 0.5
        "standard_deviation_method": "Staffell_Pfenninger",  #
        # 'turbulence_intensity' (default)
        # or 'Staffell_Pfenninger'
        "smoothing_order": "wind_farm_power_curves",  #
        # 'wind_farm_power_curves' (default) or
        # 'turbine_power_curves'
        "wind_speed_model": "logarithmic",  # 'logarithmic' (default),
        # 'hellman' or
        # 'interpolation_extrapolation'
        "density_model": "ideal_gas",  # 'barometric' (default), 'ideal_gas' or
        # 'interpolation_extrapolation'
        "temperature_model": "linear_gradient",  # 'linear_gradient' (def.) or
        # 'interpolation_extrapolation'
        "power_output_model": "power_curve",  # 'power_curve' (default) or
        # 'power_coefficient_curve'
        "density_correction": True,  # False (default) or True
        "obstacle_height": 0,  # default: 0
        "hellman_exp": None,
    }
    mc_example_cluster = TurbineClusterModelChain(
        wind_farm, **modelchain_data
    ).run_model(weather)
    return mc_example_cluster.power_output
