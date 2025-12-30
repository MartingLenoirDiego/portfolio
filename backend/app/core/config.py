import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int

    ADMIN_TOKEN: str
    CORS_ORIGINS: str 
    API_KEY_NAME: str 

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://{self.POSTGRES_USER}:"
            f"{self.POSTGRES_PASSWORD}@"
            f"{self.POSTGRES_HOST}:"
            f"{self.POSTGRES_PORT}/"
            f"{self.POSTGRES_DB}"
        )

    @property
    def origins_list(self) -> list[str]:
        # Transforme la CSV en liste
        return self.CORS_ORIGINS.split(",") if self.CORS_ORIGINS else []

    class Config:
        env_file = ".env"
        extra = "allow"  # pour éviter l'erreur extra_forbidden

# Instancier les settings
settings = Settings()

# Définir des variables globales pour le reste du code
API_KEY = settings.ADMIN_TOKEN
ORIGINS = settings.origins_list
API_KEY_NAME = settings.API_KEY_NAME
