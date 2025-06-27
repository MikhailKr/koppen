from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_title: str = "Wind farm forecasts"
    database_url: str = "sqlite+aiosqlite:///./fastapi.db"

    class Config:
        env_file = ".env"


settings = Settings()
