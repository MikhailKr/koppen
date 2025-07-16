from sqladmin import ModelView

from models.forecast import Forecast, ForecastHistory


class ForecastAdmin(ModelView, model=Forecast):
    column_list = [
        "id",
        "name",
        "start_time",
        "forecast_frequency",
        "enable",
        "wind_farm_id",
    ]


class ForecastHistoryAdmin(ModelView, model=ForecastHistory):
    column_list = [
        "id",
        "forecast_id",
        "wind_farm_id",
        "generated_at",
    ]
