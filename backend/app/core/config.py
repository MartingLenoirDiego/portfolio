import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("ADMIN_TOKEN")
API_KEY_NAME = "access_token"
ORIGINS = os.getenv("CORS_ORIGINS", "").split(",")

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://{self.POSTGRES_USER}:"
            f"{self.POSTGRES_PASSWORD}@"
            f"{self.POSTGRES_HOST}:"
            f"{self.POSTGRES_PORT}/"
            f"{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"

settings = Settings()
