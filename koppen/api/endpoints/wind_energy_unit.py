# Crud for wind turbine

# TODO: finish wind_energy_unit_block. Make it work and make it looks fine and deploy it to gitlab
from sqlalchemy.exc import IntegrityError

from fastapi import APIRouter, Path, Response
from fastapi import Depends, HTTPException
from sqlalchemy import select
from core.db import get_async_session
from sqlalchemy.orm import joinedload, selectinload
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from core.auth import get_current_user
from models.user import User
from models.forecast import Forecast
from models.wind_energy_unit import (
    Location,
    PowerCurve,
    WindFarm,
    WindTurbine,
    WindTurbineFleet,
)
from schemas.wind_energy_unit import (
    LocationCreate,
    LocationDB,
    PowerCurveCreate,
    PowerCurveDB,
    PowerCurveUpdate,
    WindFarmCreate,
    WindFarmDB,
    WindFarmForecastCreate,
    WindFarmUpdate,
    WindTurbineCreate,
    WindTurbineDB,
    WindTurbineFleetCreate,
    WindTurbineFleetDB,
    WindTurbineFleetUpdate,
    WindTurbineUpdate,
)

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get(
    "/wind_farms",
)
async def get_wind_farms(
    session: AsyncSession = Depends(get_async_session),
):
    query = select(WindFarm).options(joinedload(WindFarm.location))
    result = await session.execute(query)
    wind_farms = result.scalars().all()

    return wind_farms


@router.post(
    "/location", response_model=LocationDB, status_code=status.HTTP_201_CREATED
)
async def create_location(
    location: LocationCreate,
    session: AsyncSession = Depends(get_async_session),
):
    new_location = Location(latitude=location.latitude, longitude=location.longitude)
    session.add(new_location)
    await session.commit()
    await session.refresh(new_location)
    return new_location


@router.post(
    "/wind_farms",
    response_model=WindFarmDB,
    status_code=status.HTTP_201_CREATED,
    description="Create a new wind farm,location, wind_turbine_fleets, and forecast",
)
async def create_wind_farm(
    wind_farm: WindFarmCreate,
    session: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user),
):
    try:
        # async with session.begin():
        # 1. Create Location
        new_location = Location(
            longitude=wind_farm.location.longitude,
            latitude=wind_farm.location.latitude,
        )
        session.add(new_location)
        await session.flush()

        # 2. Create WindFarm
        new_wind_farm = WindFarm(
            name=wind_farm.name,
            description=wind_farm.description,
            location_id=new_location.id,
            user_id=current_user.id,
        )
        session.add(new_wind_farm)
        await session.flush()

        # 3. Create Forecasts (as a list)
        for forecast_data in wind_farm.forecasts:
            new_forecast = Forecast(
                time_resolution=forecast_data.time_resolution,
                repeat_daily=forecast_data.repeat_daily,
                daily_time=forecast_data.daily_time,
                repeat_hourly=forecast_data.repeat_hourly,
                hourly_minute=forecast_data.hourly_minute,
                wind_farm_id=new_wind_farm.id,
            )
            session.add(new_forecast)

        # 4. Create WindTurbineFleets
        for fleet in wind_farm.wind_turbine_fleet:
            new_fleet = WindTurbineFleet(
                number_of_turbines=fleet.number_of_turbines,
                wind_turbine_id=fleet.wind_turbine_id,
                wind_farm_id=new_wind_farm.id,
            )
            session.add(new_fleet)

        # await session.flush()
        await session.commit()

        return Response(status_code=status.HTTP_201_CREATED)
    except IntegrityError:
        await session.rollback()
        raise


# @router.post(
#     "/wind_farms", response_model=WindFarmDB, status_code=status.HTTP_201_CREATED
# )
# async def create_wind_farm(
#     wind_farm: WindFarmCreate,
#     session: AsyncSession = Depends(get_async_session),
# ):
#     stmt = select(Location).where(
#         Location.latitude == wind_farm.location.latitude,
#         Location.longitude == wind_farm.location.longitude,
#     )
#     result = await session.execute(stmt)
#     location = result.scalars().first()

#     if not location:
#         location = Location(
#             latitude=wind_farm.location.latitude, longitude=wind_farm.location.longitude
#         )
#         session.add(location)
#         await session.commit()
#         await session.refresh(location)

#     wind_farm_obj = WindFarm(
#         name=wind_farm.name,
#         description=wind_farm.description,
#         location_id=location.id,
#     )
#     session.add(wind_farm_obj)
#     await session.commit()
#     await session.refresh(wind_farm_obj)
#     stmt = (
#         select(WindFarm)
#         .options(selectinload(WindFarm.location))
#         .where(WindFarm.id == wind_farm_obj.id)
#     )
#     result = await session.execute(stmt)
#     wind_farm_obj = result.scalars().first()
#     return wind_farm_obj


@router.patch("/wind_farms/{wind_farm_id}", response_model=WindFarmDB)
async def update_wind_farm(
    wind_farm_id: int,
    wind_farm: WindFarmUpdate,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = select(WindFarm).where(WindFarm.id == wind_farm_id)
    result = await session.execute(stmt)
    wind_farm_obj = result.scalars().first()

    if not wind_farm_obj:
        raise HTTPException(status_code=404, detail="Wind farm not found")

    stmt = select(Location).where(
        Location.latitude == wind_farm.location.latitude,
        Location.longitude == wind_farm.location.longitude,
    )
    result = await session.execute(stmt)
    location = result.scalars().first()

    if not location:
        location = Location(
            latitude=wind_farm.location.latitude, longitude=wind_farm.location.longitude
        )
        session.add(location)
        await session.commit()
        await session.refresh(location)

    wind_farm_obj.name = wind_farm.name
    wind_farm_obj.description = wind_farm.description
    wind_farm_obj.location_id = location.id
    await session.commit()
    await session.refresh(wind_farm_obj)
    stmt = (
        select(WindFarm)
        .options(selectinload(WindFarm.location))
        .where(WindFarm.id == wind_farm_obj.id)
    )
    result = await session.execute(stmt)
    wind_farm_obj = result.scalars().first()
    return wind_farm_obj


@router.get("/wind_farms/{wind_farm_id}", response_model=WindFarmDB)
async def get_wind_farm(
    wind_farm_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = (
        select(WindFarm)
        .where(WindFarm.id == wind_farm_id)
        .options(
            selectinload(WindFarm.location),
            selectinload(WindFarm.forecasts),
            selectinload(WindFarm.wind_turbine_fleet).options(
                selectinload(WindTurbineFleet.wind_turbine).selectinload(
                    WindTurbine.power_curve
                )
            ),
        )
    )
    result = await session.execute(stmt)
    wind_farm_obj = result.scalars().first()
    if not wind_farm_obj:
        raise HTTPException(status_code=404, detail="Wind farm not found")
    return wind_farm_obj


@router.post("/wind_farms/{wind_farm_id}/forecasts")
async def create_forecast(
    wind_farm_id: int,
    wind_farm_forecast: WindFarmForecastCreate,
    session: AsyncSession = Depends(get_async_session),
):
    """
    Placeholder for creating a forecast for a wind farm.
    This function should be implemented to handle the creation of forecasts.
    """
    stmt = select(WindFarm).where(WindFarm.id == wind_farm_id)
    result = await session.execute(stmt)
    wind_farm_obj = result.scalars().first()

    if not wind_farm_obj:
        raise HTTPException(status_code=404, detail="Wind farm not found")

    # Here you would implement the logic to create a forecast
    # For now, we just return a placeholder response
    return {
        "message": "Forecast creation is not yet implemented",
        "wind_farm_id": wind_farm_id,
        "forecast_data": wind_farm_forecast.model_dump(),
    }


@router.get("/wind_farms/{wind_farm_id}/forecasts")
async def get_wind_farm_forecasts(
    wind_farm_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = select(Forecast).where(Forecast.wind_farm_id == wind_farm_id)
    result = await session.execute(stmt)
    wind_farm_forecast_obj = result.scalars().all()
    return wind_farm_forecast_obj


@router.delete("/wind_farms/{wind_farm_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_wind_farm(
    wind_farm_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = select(WindFarm).where(WindFarm.id == wind_farm_id)
    result = await session.execute(stmt)
    wind_farm_obj = result.scalars().first()

    if not wind_farm_obj:
        raise HTTPException(status_code=404, detail="Wind farm not found")

    await session.delete(wind_farm_obj)
    await session.commit()


@router.get("/power_curves", response_model=list[PowerCurveDB])
async def get_power_curves(session: AsyncSession = Depends(get_async_session)):
    stmt = select(PowerCurve)
    result = await session.execute(stmt)
    power_curves = result.scalars().all()
    return power_curves


@router.get("/power_curves/{power_curve_id}", response_model=PowerCurveDB)
async def get_power_curve(
    power_curve_id: int, session: AsyncSession = Depends(get_async_session)
):
    stmt = select(PowerCurve).where(PowerCurve.id == power_curve_id)
    result = await session.execute(stmt)
    power_curve = result.scalars().first()

    if not power_curve:
        raise HTTPException(status_code=404, detail="Power curve not found")

    return power_curve


@router.post(
    "/power_curves", response_model=PowerCurveDB, status_code=status.HTTP_201_CREATED
)
async def create_power_curve(
    power_curve: PowerCurveCreate,
    session: AsyncSession = Depends(get_async_session),
):
    new_power_curve = PowerCurve(**power_curve.model_dump())
    session.add(new_power_curve)
    await session.commit()
    await session.refresh(new_power_curve)
    return new_power_curve


@router.patch("/power_curves/{power_curve_id}", response_model=PowerCurveDB)
async def update_power_curve(
    power_curve_id: int,
    power_curve_update: PowerCurveUpdate,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = select(PowerCurve).where(PowerCurve.id == power_curve_id)
    result = await session.execute(stmt)
    power_curve = result.scalars().first()

    if not power_curve:
        raise HTTPException(status_code=404, detail="Power curve not found")

    power_curve.wind_speed_value_map = power_curve_update.wind_speed_value_map
    await session.commit()
    await session.refresh(power_curve)
    return power_curve


@router.delete("/power_curves/{power_curve_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_power_curve(
    power_curve_id: int, session: AsyncSession = Depends(get_async_session)
):
    stmt = select(PowerCurve).where(PowerCurve.id == power_curve_id)
    result = await session.execute(stmt)
    power_curve = result.scalars().first()

    if not power_curve:
        raise HTTPException(status_code=404, detail="Power curve not found")

    await session.delete(power_curve)
    await session.commit()


@router.get("/wind_turbines", response_model=list[WindTurbineDB])
async def get_wind_turbines(session: AsyncSession = Depends(get_async_session)):
    stmt = select(WindTurbine).options(selectinload(WindTurbine.power_curve))
    result = await session.execute(stmt)
    wind_turbines = result.scalars().all()
    return wind_turbines


@router.get("/wind_turbines/{wind_turbine_id}", response_model=WindTurbineDB)
async def get_wind_turbine(
    wind_turbine_id: int = Path(..., title="The id to retrive wind turbine"),
    session: AsyncSession = Depends(get_async_session),
):
    stmt = (
        select(WindTurbine)
        .options(selectinload(WindTurbine.power_curve))
        .where(WindTurbine.id == wind_turbine_id)
    )
    result = await session.execute(stmt)
    wind_turbine = result.scalars().first()
    if not wind_turbine:
        raise HTTPException(status_code=404, detail="Wind turbine not found")
    return wind_turbine


@router.post(
    "/wind_turbines", response_model=WindTurbineDB, status_code=status.HTTP_201_CREATED
)
async def create_wind_turbine(
    wind_turbine: WindTurbineCreate,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = select(PowerCurve).where(PowerCurve.id == wind_turbine.power_curve_id)
    result = await session.execute(stmt)
    power_curve = result.scalars().first()

    if not power_curve:
        raise HTTPException(status_code=404, detail="Power curve not found")

    new_wind_turbine = WindTurbine(**wind_turbine.model_dump())

    session.add(new_wind_turbine)
    await session.commit()
    await session.refresh(new_wind_turbine)
    stmt = (
        select(WindTurbine)
        .options(selectinload(WindTurbine.power_curve))
        .where(WindTurbine.id == new_wind_turbine.id)
    )
    result = await session.execute(stmt)
    wind_turbine_obj = result.scalars().first()
    return wind_turbine_obj


@router.patch("/wind_turbines/{wind_turbine_id}", response_model=WindTurbineDB)
async def update_wind_turbine(
    wind_turbine_id: int,
    wind_turbine_update: WindTurbineUpdate,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = (
        select(WindTurbine)
        .options(selectinload(WindTurbine.power_curve))
        .where(WindTurbine.id == wind_turbine_id)
    )
    result = await session.execute(stmt)
    wind_turbine = result.scalars().first()

    if not wind_turbine:
        raise HTTPException(status_code=404, detail="Wind turbine not found")

    for key, value in wind_turbine_update.model_dump().items():
        if value is None:
            continue
        setattr(wind_turbine, key, value)

    await session.commit()
    await session.refresh(wind_turbine)
    return wind_turbine


@router.delete(
    "/wind_turbines/{wind_turbine_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_wind_turbine(
    wind_turbine_id: int, session: AsyncSession = Depends(get_async_session)
):
    stmt = (
        select(WindTurbine)
        .options(selectinload(WindTurbine.power_curve))
        .where(WindTurbine.id == wind_turbine_id)
    )
    result = await session.execute(stmt)
    wind_turbine = result.scalars().first()

    if not wind_turbine:
        raise HTTPException(status_code=404, detail="Wind turbine not found")

    await session.delete(wind_turbine)
    await session.commit()


@router.get("/wind_turbine_fleets", response_model=list[WindTurbineFleetDB])
async def get_wind_fleets(session: AsyncSession = Depends(get_async_session)):
    stmt = select(WindTurbineFleet).options(
        selectinload(WindTurbineFleet.wind_turbine).selectinload(
            WindTurbine.power_curve
        ),
    )
    result = await session.execute(stmt)
    wind_fleets = result.scalars().all()
    return wind_fleets


@router.get("/wind_turbine_fleets/{wind_fleet_id}", response_model=WindTurbineFleetDB)
async def get_wind_fleet(
    wind_fleet_id: int, session: AsyncSession = Depends(get_async_session)
):
    stmt = (
        select(WindTurbineFleet)
        .options(
            selectinload(WindTurbineFleet.wind_turbine).selectinload(
                WindTurbine.power_curve
            )
        )
        .where(WindTurbineFleet.id == wind_fleet_id)
    )
    result = await session.execute(stmt)
    wind_fleet = result.scalars().first()
    return wind_fleet


@router.post(
    "/wind_turbine_fleets",
    response_model=WindTurbineFleetDB,
    status_code=status.HTTP_201_CREATED,
)
async def create_wind_fleet(
    wind_fleet: WindTurbineFleetCreate,
    session: AsyncSession = Depends(get_async_session),
):
    stmt = select(WindTurbine).where(WindTurbine.id == wind_fleet.wind_turbine_id)
    result = await session.execute(stmt)
    wind_turbine = result.scalars().first()
    if not wind_turbine:
        raise HTTPException(status_code=404, detail="Wind turbine not found")
    new_wind_fleet = WindTurbineFleet(**wind_fleet.model_dump())
    session.add(new_wind_fleet)
    await session.commit()
    await session.refresh(new_wind_fleet)
    stmt = (
        select(WindTurbineFleet)
        .options(
            selectinload(WindTurbineFleet.wind_turbine).selectinload(
                WindTurbine.power_curve
            )
        )
        .where(WindTurbineFleet.id == new_wind_fleet.id)
    )
    result = await session.execute(stmt)
    wind_fleet = result.scalars().first()
    return wind_fleet


@router.patch("/wind_turbine_fleets/{wind_fleet_id}", response_model=WindTurbineFleetDB)
async def update_wind_fleet(
    wind_fleet_id: int,
    wind_fleet_update: WindTurbineFleetUpdate,
    session: AsyncSession = Depends(get_async_session),
):
    stmp = (
        select(WindTurbineFleet)
        .options(
            selectinload(WindTurbineFleet.wind_turbine).selectinload(
                WindTurbine.power_curve
            )
        )
        .where(WindTurbineFleet.id == wind_fleet_id)
    )
    result = await session.execute(stmp)
    wind_fleet = result.scalars().first()
    if not wind_fleet:
        raise HTTPException(status_code=404, detail="Wind turbine fleet not found")
    for key, value in wind_fleet_update.model_dump().items():
        if value is not None:
            setattr(wind_fleet, key, value)
    await session.commit()
    await session.refresh(wind_fleet)
    return wind_fleet


@router.delete(
    "/wind_turbine_fleets/{wind_fleet_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_wind_fleet(
    wind_fleet_id: int, session: AsyncSession = Depends(get_async_session)
):
    stmt = select(WindTurbineFleet).where(WindTurbineFleet.id == wind_fleet_id)
    result = await session.execute(stmt)
    wind_fleet = result.scalars().first()
    if not wind_fleet:
        raise HTTPException(status_code=404, detail="Wind turbine fleet not found")
    await session.delete(wind_fleet)
    await session.commit()
