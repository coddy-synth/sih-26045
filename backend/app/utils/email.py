import logging
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import EmailStr
from app.config import settings

logger = logging.getLogger(__name__)

# FastAPI-Mail Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.mail_username,
    MAIL_PASSWORD=settings.mail_password,
    MAIL_FROM=settings.mail_from,
    MAIL_PORT=settings.mail_port,
    MAIL_SERVER=settings.mail_server,
    MAIL_STARTTLS=settings.mail_starttls,
    MAIL_SSL_TLS=settings.mail_ssl_tls,
    USE_CREDENTIALS=bool(settings.mail_username and settings.mail_password),
    VALIDATE_CERTS=True
)

async def send_otp_email(email: EmailStr, otp: str):
    """
    Sends an OTP to the specified email address.
    """
    html = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Verify your email</h2>
        <p>Your verification code is: <strong>{otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
    </div>
    """

    message = MessageSchema(
        subject="Your OTP Verification Code",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        logger.info(f"OTP email sent to {email}")
    except Exception as e:
        logger.error(f"Failed to send email to {email}: {e}")
        # In a real app, you might want to raise this or handle it gracefully
