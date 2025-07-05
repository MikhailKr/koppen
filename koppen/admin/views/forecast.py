from sqladmin import ModelView

from models.forecast import Forecast


class ForecastAdmin(ModelView, model=Forecast):
    column_list = [
        Forecast.id,
        Forecast.wind_farm_id,
        Forecast.time_resolution,
        Forecast.repeat_daily,
        Forecast.daily_time,
        Forecast.repeat_hourly,
        Forecast.hourly_minute,
    ]
