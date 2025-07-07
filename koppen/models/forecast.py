from sqlalchemy import Column, Integer, ForeignKey, Enum, Time, Boolean
from sqlalchemy.orm import relationship
from core.db import Base
import enum


class TimeResolutionEnum(str, enum.Enum):
    minute = "minute"
    hour = "hour"
    day = "day"


class Forecast(Base):
    time_resolution = Column(
        Enum(TimeResolutionEnum), nullable=False, default=TimeResolutionEnum.hour
    )
    wind_farm_id = Column(Integer, ForeignKey("windfarm.id"), nullable=False)
    wind_farm = relationship("WindFarm", back_populates="forecasts")
    repeat_daily = Column(Boolean, default=False)
    daily_time = Column(Time, nullable=True)
    repeat_hourly = Column(Boolean, default=False)
    hourly_minute = Column(Integer, nullable=True)
