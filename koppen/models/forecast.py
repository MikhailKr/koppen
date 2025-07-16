from datetime import datetime
from sqlalchemy import (
    JSON,
    Column,
    DateTime,
    Integer,
    ForeignKey,
    Enum,
    String,
    Text,
    Time,
    Boolean,
)
from sqlalchemy.orm import relationship
from core.db import Base
import enum


class ForecastFrequencyEnum(str, enum.Enum):
    daily = "daily"
    hourly = "hourly"


class GranularityEnum(str, enum.Enum):
    minutes_60 = "60 minutes"
    minutes_30 = "30 minutes"
    minutes_15 = "15 minutes"


class HorizonEnum(str, enum.Enum):
    hour_3 = "3 hours"
    hour_24 = "24 hours"
    hour_48 = "48 hours"
    hour_120 = "120 hours"


class Forecast(Base):
    name = Column(String(255), nullable=False)
    granularity = Column(
        Enum(GranularityEnum),
        nullable=False,
        default=GranularityEnum.minutes_60,
        doc="Forecast granularity in minutes",
    )
    horizon = Column(
        Enum(HorizonEnum),
        nullable=False,
        default=HorizonEnum.hour_24,
        doc="Forecast time horizon in hours",
    )
    recipients = Column(JSON, nullable=False, server_default="[]")
    start_time = Column(
        Time, nullable=True, doc="Start time of the forecast, if applicable"
    )
    forecast_frequency = Column(
        Enum(ForecastFrequencyEnum),
        nullable=False,
        default=ForecastFrequencyEnum.hourly,
        doc="Frequency of the forecast (daily or hourly)",
    )
    enable = Column(Boolean, default=True, doc="Enable or disable the forecast")
    wind_farm_id = Column(Integer, ForeignKey("windfarm.id"), nullable=False)
    wind_farm = relationship("WindFarm", back_populates="forecasts")
    history_records = relationship("ForecastHistory", back_populates="forecast")


class ForecastHistory(Base):
    forecast_id = Column(Integer, ForeignKey("forecast.id"), nullable=False)
    wind_farm_id = Column(Integer, ForeignKey("windfarm.id"), nullable=False)
    generated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    csv_data = Column(Text, nullable=False)  # Stores the CSV content as text

    # Relationships
    forecast = relationship("Forecast", back_populates="history_records")
    wind_farm = relationship("WindFarm")
