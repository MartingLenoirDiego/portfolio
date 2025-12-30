from app.db.base import Base
from app.core.config import settings
from sqlalchemy import engine_from_config, pool

config.set_main_option("sqlalchemy.url", settings.database_url)
target_metadata = Base.metadata
