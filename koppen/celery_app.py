from celery import Celery
import os
from datetime import datetime
import asyncio
from utils.email_utils import send_email_async

# Set the broker URL (use Redis)
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/0")

celery_app = Celery(
    "koppen",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND,
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    beat_schedule={
        "print_time_every_minute": {
            "task": "celery_app.print_time",
            "schedule": 60.0,  # every 60 seconds
        },
    },
)


# Example task
def test_task():
    print("Celery is working!")
    return "Hello from Celery!"


celery_app.task(test_task)


@celery_app.task(name="celery_app.print_time")
def print_time():
    now = datetime.utcnow().isoformat()
    print(f"[Celery Scheduled Task] The time is: {now}")
    return now


def send_scheduled_forecasts_via_email():
    # This function would contain the logic to send scheduled forecasts via email.
    # For now, it just prints a message.
    print("Sending scheduled forecasts via email...")


@celery_app.task(name="celery_app.send_scheduled_forecasts")
def send_scheduled_forecasts():
    """Celery periodic task to send scheduled forecasts via email."""
    print("Starting scheduled forecasts task...")
    asyncio.run(_send_scheduled_forecasts_async())


async def _send_scheduled_forecasts_async():
    # async with AsyncSessionLocal() as session:
    # now = datetime.utcnow()
    await send_email_async(
        "mikhailkr5@gmail.com", "test", "This is a test email from Koppen."
    )
    # forecasts = (await session.execute(select(Forecast))).scalars().all()
    # for forecast in forecasts:
    #     # Check if it's time to send (daily or hourly)
    #     should_send = False
    #     if forecast.repeat_daily and forecast.daily_time:
    #         if now.time().hour == forecast.daily_time.hour and now.time().minute == forecast.daily_time.minute:
    #             should_send = True
    #     if forecast.repeat_hourly and forecast.hourly_minute is not None:
    #         if now.time().minute == forecast.hourly_minute:
    #             should_send = True
    #     if not should_send:
    #         continue
    #     # Get wind farm and user
    #     wind_farm = await session.get(WindFarm, forecast.wind_farm_id)
    #     user = await session.get(User, wind_farm.user_id)
    #     # Calculate forecast
    #     forecast_data = await calculate_forecast(session, wind_farm.id)
    #     # Send email
    #     subject = f"Forecast for {wind_farm.name}"
    #     body = f"Forecast data: {forecast_data}"
    #     await send_email_async(user.email, subject, body)


# Add to beat_schedule
celery_app.conf.beat_schedule["send_scheduled_forecasts"] = {
    "task": "celery_app.send_scheduled_forecasts",
    "schedule": 60.0,  # every minute
}
