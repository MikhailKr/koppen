from core.db import Base
from sqlalchemy import JSON, Column, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship


class Location(Base):
    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    wind_farm = relationship("WindFarm", back_populates="location")

    def __str__(self):
        return f"Location(id={self.id}, longitude={self.longitude}, latitude={self.latitude})"


class WindFarm(Base):
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    wind_turbine_fleet = relationship("WindTurbineFleet", back_populates="wind_farm")
    location_id = Column(Integer, ForeignKey("location.id"), nullable=False)
    location = relationship("Location", back_populates="wind_farm")
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="wind_farms")

    def __str__(self):
        return (
            f"WindFarm(id={self.id}, name={self.name}, description={self.description})"
        )


class WindTurbineFleet(Base):
    wind_farm_id = Column(Integer, ForeignKey("windfarm.id"), nullable=True)
    wind_turbine_id = Column(Integer, ForeignKey("windturbine.id"), nullable=False)
    number_of_turbines = Column(Integer, nullable=False)

    wind_farm = relationship("WindFarm", back_populates="wind_turbine_fleet")
    wind_turbine = relationship("WindTurbine", back_populates="wind_turbine_fleet")

    def __str__(self):
        return f"WindTurbineFleet(id={self.id}, number_of_turbines={self.number_of_turbines})"


class WindTurbine(Base):
    power_curve_id = Column(Integer, ForeignKey("powercurve.id"), nullable=True)
    power_curve = relationship("PowerCurve", back_populates="wind_turbine")

    hub_height = Column(
        Float, nullable=False, default=100, doc="Height of the wind turbine in m"
    )
    turbine_type = Column(String(255), nullable=True, default=None)
    nominal_power = Column(
        Float, nullable=False, default=1, doc="Nominal power of the wind turbine in MW"
    )
    wind_turbine_fleet = relationship("WindTurbineFleet", back_populates="wind_turbine")

    def __str__(self):
        return f"WindTurbine(id={self.id}, turbine_type={self.turbine_type}, nominal_power={self.nominal_power}, hub_height={self.hub_height})"


class PowerCurve(Base):
    wind_turbine = relationship("WindTurbine", back_populates="power_curve")
    wind_speed_value_map = Column(JSON, nullable=False, default={})

    def add_entry(self, wind_speed: float, value: float):
        if self.wind_speed_value_map is None:
            self.wind_speed_value_map = {}
        self.wind_speed_value_map[wind_speed] = value

    def __str__(self):
        return f"PowerCurve(id={self.id}, wind_speed_value_map={self.wind_speed_value_map})"
