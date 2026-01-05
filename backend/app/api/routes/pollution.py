from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime
from app.schemas.schemas import PollutionDataResponse, PollutionQuery
import random

router = APIRouter()

# Mock pollution data generator
def generate_mock_pollution_data(location: str, lat: float, lon: float) -> dict:
    """Generate mock pollution data for demonstration."""
    # Simulate varying pollution levels
    base_pm25 = random.uniform(10, 150)
    
    return {
        "id": f"poll_{random.randint(1000, 9999)}",
        "location": location,
        "latitude": lat,
        "longitude": lon,
        "date": datetime.now().isoformat(),
        "pm25": round(base_pm25, 2),
        "pm10": round(base_pm25 * 1.5, 2),
        "no2": round(random.uniform(10, 100), 2),
        "o3": round(random.uniform(20, 80), 2),
        "co": round(random.uniform(0.5, 5), 2),
        "temperature": round(random.uniform(15, 35), 1),
        "humidity": round(random.uniform(30, 80), 1),
        "aqi": calculate_aqi(base_pm25),
        "pollutionIndex": round(calculate_pi(base_pm25, random.uniform(20, 30), random.uniform(1, 3), 100), 2),
        "createdAt": datetime.now().isoformat()
    }

def calculate_aqi(pm25: float) -> int:
    """Calculate AQI from PM2.5."""
    if pm25 <= 12:
        return int(pm25 * 4.17)
    elif pm25 <= 35.4:
        return int(((pm25 - 12.1) / 23.3) * 49 + 51)
    elif pm25 <= 55.4:
        return int(((pm25 - 35.5) / 19.9) * 49 + 101)
    elif pm25 <= 150.4:
        return int(((pm25 - 55.5) / 94.9) * 99 + 151)
    else:
        return int(((pm25 - 150.5) / 99.9) * 99 + 201)

def calculate_pi(pm25: float, temp: float, co: float, altitude: float) -> float:
    """Calculate pollution index using the formula."""
    return max(0, min(0.3 * temp + 0.4 * pm25 + 1.2 * co - 0.8 * altitude, 500))

@router.get("/current", response_model=PollutionDataResponse)
async def get_current_pollution(
    location: Optional[str] = Query(None),
    latitude: Optional[float] = Query(None),
    longitude: Optional[float] = Query(None)
):
    """Get current pollution data for a location."""
    if not location and (latitude is None or longitude is None):
        raise HTTPException(
            status_code=400,
            detail="Either location or latitude/longitude must be provided"
        )
    
    # Use provided coordinates or default to New Delhi
    lat = latitude if latitude else 28.6139
    lon = longitude if longitude else 77.2090
    loc = location if location else "New Delhi, India"
    
    data = generate_mock_pollution_data(loc, lat, lon)
    return PollutionDataResponse(**data)

@router.get("/history")
async def get_pollution_history(
    location: str = Query(...),
    days: int = Query(7, ge=1, le=365)
):
    """Get historical pollution data for a location."""
    history = []
    
    for i in range(days):
        date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        date = date.replace(day=date.day - i)
        
        base_pm25 = random.uniform(10, 150)
        history.append({
            "date": date.isoformat(),
            "pm25": round(base_pm25, 2),
            "aqi": calculate_aqi(base_pm25),
            "location": location
        })
    
    return {"location": location, "history": history}

@router.get("/map")
async def get_pollution_map(
    north: float = Query(...),
    south: float = Query(...),
    east: float = Query(...),
    west: float = Query(...)
):
    """Get pollution data for a map bounding box."""
    # Generate mock data points within the bounding box
    points = []
    num_points = 20
    
    for _ in range(num_points):
        lat = random.uniform(south, north)
        lon = random.uniform(west, east)
        pm25 = random.uniform(10, 150)
        
        points.append({
            "latitude": round(lat, 4),
            "longitude": round(lon, 4),
            "pm25": round(pm25, 2),
            "aqi": calculate_aqi(pm25)
        })
    
    return {"bounds": {"north": north, "south": south, "east": east, "west": west}, "points": points}
