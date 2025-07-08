from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_title: str = "Wind farm forecasts"
    database_url: str = "sqlite+aiosqlite:///./fastapi.db"
    smtp_server: str = "smtp.example.com"
    smtp_user: str = ""
    smtp_password: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
