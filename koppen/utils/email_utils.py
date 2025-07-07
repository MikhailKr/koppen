import aiosmtplib
from email.message import EmailMessage
import os

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.yandex.ru")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)


async def send_email_async(to_email: str, subject: str, body: str):
    message = EmailMessage()
    message["From"] = FROM_EMAIL
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(body)
    print(f"Sending email to {to_email} with subject '{subject}'")

    try:
        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            start_tls=True,
        )
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise


if __name__ == "__main__":
    import asyncio

    async def main():
        await send_email_async(
            "mikhailkr5@gmail.com", "test", "This is a test email from Koppen."
        )

    print("Starting email sending...")
    asyncio.run(main())
    print("Email sending completed.")
    # This is just a test to ensure the email sending works.
