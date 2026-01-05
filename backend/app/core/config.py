from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Project
    PROJECT_NAME: str = "Veridian API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/veridian"
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ]
    
    # External APIs
    OPENWEATHER_API_KEY: str = ""
    OPENWEATHER_BASE_URL: str = "https://api.openweathermap.org/data/2.5"
    
    # ML Models
    MODEL_PATH: str = "./ml-models"
    PREDICTION_MODEL_NAME: str = "pollution_prediction_model.h5"
    
    # Application
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
