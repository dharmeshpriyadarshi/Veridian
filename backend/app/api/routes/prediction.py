from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from app.schemas.schemas import PredictionRequest, PredictionResponse
import random

router = APIRouter()

def predict_pollution(location: str, lat: float, lon: float, target_date: datetime) -> dict:
    """
    Mock ML prediction function.
    In production, this would use a trained TensorFlow/Keras model.
    """
    # Simulate model prediction with some randomness
    base_aqi = random.randint(50, 200)
    base_pm25 = base_aqi * 0.5  # Rough conversion
    
    # Add seasonal variation
    month = target_date.month
    if month in [11, 12, 1, 2]:  # Winter months - higher pollution
        base_aqi = int(base_aqi * 1.3)
        base_pm25 = base_pm25 * 1.3
    elif month in [6, 7, 8, 9]:  # Monsoon months - lower pollution
        base_aqi = int(base_aqi * 0.7)
        base_pm25 = base_pm25 * 0.7
    
    # Ensure values are within realistic ranges
    predicted_aqi = min(500, max(0, base_aqi))
    predicted_pm25 = min(500, max(0, base_pm25))
    
    # Simulate confidence score
    days_ahead = (target_date - datetime.now()).days
    confidence = max(0.5, 1.0 - (days_ahead / 365) * 0.3)  # Confidence decreases with time
    
    return {
        "predictedAQI": predicted_aqi,
        "predictedPM25": round(predicted_pm25, 2),
        "confidence": round(confidence, 2),
        "modelVersion": "v1.0.0-beta"
    }

@router.post("/predict", response_model=PredictionResponse)
async def create_prediction(request: PredictionRequest):
    """Generate pollution prediction for a specific date and location."""
    
    # Validate prediction date
    if request.predictionDate <= datetime.now():
        raise HTTPException(
            status_code=400,
            detail="Prediction date must be in the future"
        )
    
    max_date = datetime.now() + timedelta(days=365)
    if request.predictionDate > max_date:
        raise HTTPException(
            status_code=400,
            detail="Prediction date cannot be more than 1 year in the future"
        )
    
    # Generate prediction
    prediction_data = predict_pollution(
        request.location,
        request.latitude,
        request.longitude,
        request.predictionDate
    )
    
    # Create response
    response = {
        "id": f"pred_{random.randint(1000, 9999)}",
        "location": request.location,
        "latitude": request.latitude,
        "longitude": request.longitude,
        "predictionDate": request.predictionDate.isoformat(),
        "predictedAQI": prediction_data["predictedAQI"],
        "predictedPM25": prediction_data["predictedPM25"],
        "confidence": prediction_data["confidence"],
        "modelVersion": prediction_data["modelVersion"],
        "createdAt": datetime.now().isoformat()
    }
    
    return PredictionResponse(**response)

@router.get("/forecast")
async def get_forecast(
    location: str,
    latitude: float,
    longitude: float,
    days: int = 7
):
    """Get pollution forecast for multiple days."""
    
    if days < 1 or days > 365:
        raise HTTPException(
            status_code=400,
            detail="Days must be between 1 and 365"
        )
    
    forecast = []
    current_date = datetime.now()
    
    for i in range(days):
        target_date = current_date + timedelta(days=i+1)
        prediction = predict_pollution(location, latitude, longitude, target_date)
        
        forecast.append({
            "date": target_date.isoformat(),
            "predictedAQI": prediction["predictedAQI"],
            "predictedPM25": prediction["predictedPM25"],
            "confidence": prediction["confidence"]
        })
    
    return {
        "location": location,
        "latitude": latitude,
        "longitude": longitude,
        "forecast": forecast
    }

@router.get("/yearly")
async def get_yearly_prediction(
    location: str,
    latitude: float,
    longitude: float,
    year: int = 2026
):
    """Get monthly pollution predictions for an entire year."""
    
    if year != 2026:
        raise HTTPException(
            status_code=400,
            detail="Currently only 2026 predictions are supported"
        )
    
    monthly_predictions = []
    
    for month in range(1, 13):
        target_date = datetime(year, month, 15)  # Middle of each month
        prediction = predict_pollution(location, latitude, longitude, target_date)
        
        monthly_predictions.append({
            "month": month,
            "year": year,
            "date": target_date.isoformat(),
            "predictedAQI": prediction["predictedAQI"],
            "predictedPM25": prediction["predictedPM25"],
            "confidence": prediction["confidence"]
        })
    
    return {
        "location": location,
        "year": year,
        "predictions": monthly_predictions
    }
