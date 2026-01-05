from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: str
    role: str
    isResearcher: bool
    createdAt: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Pollution Schemas
class PollutionDataBase(BaseModel):
    location: str
    latitude: float
    longitude: float
    pm25: Optional[float] = None
    pm10: Optional[float] = None
    no2: Optional[float] = None
    o3: Optional[float] = None
    co: Optional[float] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None

class PollutionDataResponse(PollutionDataBase):
    id: str
    date: datetime
    aqi: Optional[int] = None
    pollutionIndex: Optional[float] = None
    createdAt: datetime
    
    class Config:
        from_attributes = True

class PollutionQuery(BaseModel):
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

# Prediction Schemas
class PredictionRequest(BaseModel):
    location: str
    latitude: float
    longitude: float
    predictionDate: datetime

class PredictionResponse(BaseModel):
    id: str
    location: str
    latitude: float
    longitude: float
    predictionDate: datetime
    predictedAQI: int
    predictedPM25: float
    confidence: float
    modelVersion: str
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Simulation Schemas
class SimulationRequest(BaseModel):
    location: str
    latitude: float
    longitude: float
    area: float  # in square km
    currentAQI: int
    currentPI: float

class SimulationResponse(BaseModel):
    id: str
    location: str
    latitude: float
    longitude: float
    area: float
    currentAQI: int
    currentPI: float
    treesNeeded: int
    projectedReduction: float
    projectedAQI: int
    treePlacements: Optional[str] = None
    createdAt: datetime
    
    class Config:
        from_attributes = True

class TreePlacement(BaseModel):
    latitude: float
    longitude: float
    treeCount: int
