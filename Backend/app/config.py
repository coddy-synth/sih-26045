from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "backend"
    environment: str = "development"
    debug: bool = False
    database_url: str = "sqlite:///./app.db"
    max_retrieval_results: int = 5

    # JWT Settings
    secret_key: str = "your-super-secret-key-change-in-prod"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # Email Settings (fastapi-mail)
    mail_username: str = "ipsaktisahayak@gmail.com"
    mail_password: str = "spil wsbk kkhb akgf"
    mail_from: str = "ipsaktisahayak@gmail.com"
    mail_port: int = 587
    mail_server: str = "smtp.gmail.com"
    mail_starttls: bool = True
    mail_ssl_tls: bool = False

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
