from email.mime.text import MIMEText
import aiosmtplib
from celery import Celery
import os
from datetime import datetime, timedelta
import asyncio
from sqlalchemy.orm import selectinload

from sqlalchemy import and_, or_

from sqlalchemy import select
import pandas as pd
from core.db import AsyncSessionLocal
from forecasting.service import WindFarmForecastService
from models.forecast import Forecast
from utils.email_utils import FROM_EMAIL, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER
import io
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart

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


@celery_app.task(name="celery_app.send_scheduled_forecasts")
def send_scheduled_forecasts():
    """Celery periodic task to send scheduled forecasts via email."""
    print("Starting scheduled forecasts task...")
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(_send_scheduled_forecasts_async())
    except Exception as e:
        print(f"Error in scheduled forecasts task: {str(e)}")
        raise
    finally:
        loop.close()


celery_app.conf.beat_schedule["send_scheduled_forecasts"] = {
    "task": "celery_app.send_scheduled_forecasts",
    "schedule": 60.0,
}


async def _send_scheduled_forecasts_async():
    """Send forecast emails for all scheduled forecasts to their recipients."""
    async with AsyncSessionLocal() as session:
        try:
            await session.expire_all()
            # 0. Get all active scheduled forecasts
            now = datetime.utcnow()
            current_time = now.time()
            current_minute = now.minute

            # Create time objects for comparison
            one_minute_ago = (now - timedelta(minutes=1)).time()

            # Query forecasts that should be sent now
            scheduled_forecasts = await session.execute(
                select(Forecast)
                .options(selectinload(Forecast.wind_farm))
                .where(
                    or_(
                        # Daily forecasts where current time is within 1 minute of scheduled time
                        and_(
                            Forecast.repeat_daily == True,  # noqa: E712
                            Forecast.daily_time <= current_time,
                            Forecast.daily_time > one_minute_ago,
                        ),
                        # Hourly forecasts where current minute matches
                        and_(
                            Forecast.repeat_hourly == True,  # noqa: E712
                            Forecast.hourly_minute == current_minute,
                        ),
                    )
                )
            )

            forecasts = scheduled_forecasts.scalars().all()

            if not forecasts:
                print("No scheduled forecasts to send at this time")
                return

            # 1. Process each forecast
            for forecast in forecasts:
                try:
                    # Skip if no recipients
                    if not forecast.recipients:
                        print(f"No recipients configured for forecast {forecast.id}")
                        continue

                    print(
                        f"Processing forecast {forecast.id} for wind farm {forecast.wind_farm_id}"
                    )

                    # 2. Get forecast data
                    service = WindFarmForecastService(session)
                    forecast_data = await service.calculate_forecast(
                        forecast.wind_farm_id
                    )

                    if not forecast_data or "power_output" not in forecast_data:
                        print(
                            f"Invalid forecast data for wind farm {forecast.wind_farm_id}"
                        )
                        continue

                    # 3. Format email content
                    email_subject = f"{forecast.wind_farm.name} Power Forecast Report"
                    email_body = format_forecast_email(forecast_data)

                    # 4. Create CSV attachment
                    csv_buffer = generate_series_csv(forecast_data["power_output"])

                    # 5. Send to each recipient
                    for recipient in forecast.recipients:
                        try:
                            message = MIMEMultipart()
                            message["From"] = FROM_EMAIL
                            message["To"] = recipient
                            message["Subject"] = email_subject

                            message.attach(MIMEText(email_body, "html"))

                            csv_attachment = MIMEApplication(
                                csv_buffer.getvalue(),
                                Name=f"{forecast.wind_farm.name}_forecast.csv",
                            )
                            csv_attachment["Content-Disposition"] = (
                                f'attachment; filename="{forecast.wind_farm.name}_forecast.csv"'
                            )
                            message.attach(csv_attachment)

                            await aiosmtplib.send(
                                message,
                                hostname=SMTP_HOST,
                                port=SMTP_PORT,
                                username=SMTP_USER,
                                password=SMTP_PASSWORD,
                                start_tls=True,
                            )
                            print(f"Sent forecast to {recipient}")

                        except Exception as email_error:
                            print(f"Failed to send to {recipient}: {str(email_error)}")
                            continue  # Continue with next recipient

                except Exception as forecast_error:
                    print(
                        f"Error processing forecast {forecast.id}: {str(forecast_error)}"
                    )
                    continue  # Continue with next forecast

        except Exception as e:
            await session.rollback()
            print(f"Error in forecast processing: {str(e)}")
            raise
        # finally:
        #     await session.close()


def generate_series_csv(power_series) -> io.StringIO:
    """Generate CSV from pandas Series power data."""
    csv_buffer = io.StringIO()

    df = power_series.to_frame(name="Power Output (W)")
    df.index.name = "Timestamp"

    df.to_csv(csv_buffer)
    csv_buffer.seek(0)
    return csv_buffer


def format_forecast_email(forecast_data: dict) -> str:
    """Format pandas Series forecast data into HTML email."""
    power_series = forecast_data["power_output"]

    if not isinstance(power_series.index, pd.DatetimeIndex):
        try:
            power_series.index = pd.to_datetime(power_series.index)
        except:  # noqa: E722
            power_series.index = pd.RangeIndex(start=0, stop=len(power_series), step=1)

    power_kw = power_series / 1000
    max_power = power_kw.max()
    avg_power = power_kw.mean()
    total_energy = power_kw.sum()  # kWh equivalent for 1h resolution

    sample_data = power_kw.head(6) if len(power_kw) > 6 else power_kw

    table_rows = []
    for timestamp, power in sample_data.items():
        if isinstance(timestamp, pd.Timestamp):
            time_str = timestamp.strftime("%Y-%m-%d %H:%M UTC")
        else:
            time_str = str(timestamp)

        table_rows.append(f"""
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">{time_str}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">{power:.2f}</td>
        </tr>
        """)

    return f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <h2>Wind Farm Power Forecast</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Summary</h3>
            <p><strong>Time Period:</strong> {power_series.index[0]} to {power_series.index[-1]}</p>
            <p><strong>Maximum Power:</strong> {max_power:.2f} kW</p>
            <p><strong>Average Power:</strong> {avg_power:.2f} kW</p>
            <p><strong>Total Energy:</strong> {total_energy:.1f} kWh</p>
        </div>
        
        <h3>Sample Data (full data in attached CSV)</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #f5f5f5;">
                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Timestamp</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Power (kW)</th>
                </tr>
            </thead>
            <tbody>
                {"".join(table_rows)}
                {f'<tr><td colspan="2" style="padding: 8px; text-align: center; font-style: italic;">... {len(power_series) - 6} more records in attached CSV ...</td></tr>' if len(power_series) > 6 else ""}
            </tbody>
        </table>
        
        <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            Generated at: {pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S %Z")}
        </p>
    </body>
    </html>
    """
