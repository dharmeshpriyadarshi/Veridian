# Veridian API Documentation

## Base URL
```
Development: http://localhost:8000
Production: https://api.veridian.app
```

## Authentication

Most endpoints require authentication using JWT tokens.

### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "isResearcher": false,
    "createdAt": "2026-01-05T00:00:00Z"
  }
}
```

### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

## Pollution Endpoints

### Get Current Pollution Data
```http
GET /api/pollution/current?location=New Delhi
GET /api/pollution/current?latitude=28.6139&longitude=77.2090
```

**Response:**
```json
{
  "id": "poll_1234",
  "location": "New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "date": "2026-01-05T12:00:00Z",
  "pm25": 125.5,
  "pm10": 188.25,
  "no2": 45.2,
  "o3": 35.8,
  "co": 2.5,
  "temperature": 25.5,
  "humidity": 65.0,
  "aqi": 185,
  "pollutionIndex": 87.5,
  "createdAt": "2026-01-05T12:00:00Z"
}
```

### Get Pollution History
```http
GET /api/pollution/history?location=New Delhi&days=7
```

**Response:**
```json
{
  "location": "New Delhi",
  "history": [
    {
      "date": "2026-01-05T00:00:00Z",
      "pm25": 125.5,
      "aqi": 185,
      "location": "New Delhi"
    },
    ...
  ]
}
```

### Get Pollution Map Data
```http
GET /api/pollution/map?north=29&south=28&east=78&west=76
```

**Response:**
```json
{
  "bounds": {
    "north": 29,
    "south": 28,
    "east": 78,
    "west": 76
  },
  "points": [
    {
      "latitude": 28.5234,
      "longitude": 77.1234,
      "pm25": 95.5,
      "aqi": 165
    },
    ...
  ]
}
```

## Prediction Endpoints

### Create Prediction
```http
POST /api/prediction/predict
Content-Type: application/json

{
  "location": "New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "predictionDate": "2026-06-15T00:00:00Z"
}
```

**Response:**
```json
{
  "id": "pred_1234",
  "location": "New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "predictionDate": "2026-06-15T00:00:00Z",
  "predictedAQI": 120,
  "predictedPM25": 60.5,
  "confidence": 0.85,
  "modelVersion": "v1.0.0-beta",
  "createdAt": "2026-01-05T12:00:00Z"
}
```

### Get Forecast
```http
GET /api/prediction/forecast?location=New Delhi&latitude=28.6139&longitude=77.2090&days=7
```

**Response:**
```json
{
  "location": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "forecast": [
    {
      "date": "2026-01-06T00:00:00Z",
      "predictedAQI": 150,
      "predictedPM25": 75.0,
      "confidence": 0.92
    },
    ...
  ]
}
```

### Get Yearly Prediction
```http
GET /api/prediction/yearly?location=New Delhi&latitude=28.6139&longitude=77.2090&year=2026
```

**Response:**
```json
{
  "location": "New Delhi",
  "year": 2026,
  "predictions": [
    {
      "month": 1,
      "year": 2026,
      "date": "2026-01-15T00:00:00Z",
      "predictedAQI": 220,
      "predictedPM25": 110.0,
      "confidence": 0.88
    },
    ...
  ]
}
```

## Simulation Endpoints

### Create Simulation
```http
POST /api/simulation/simulate
Content-Type: application/json

{
  "location": "New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "area": 5.0,
  "currentAQI": 185,
  "currentPI": 87.5
}
```

**Response:**
```json
{
  "id": "sim_1234",
  "location": "New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "area": 5.0,
  "currentAQI": 185,
  "currentPI": 87.5,
  "treesNeeded": 45,
  "projectedReduction": 48.5,
  "projectedAQI": 95,
  "treePlacements": "[{\"latitude\":28.6140,\"longitude\":77.2091,\"treeCount\":1},...]",
  "createdAt": "2026-01-05T12:00:00Z"
}
```

### Get Tree Recommendations
```http
GET /api/simulation/recommendations?location=New Delhi&latitude=28.6139&longitude=77.2090&current_aqi=185&area=5.0
```

**Response:**
```json
{
  "location": "New Delhi",
  "analysis": {
    "currentAQI": 185,
    "currentCategory": "Unhealthy",
    "treesRecommended": 45,
    "projectedReduction": "48.5%",
    "projectedAQI": 95,
    "projectedCategory": "Moderate"
  },
  "economics": {
    "estimatedCost": "$22,500",
    "costPerTree": "$500",
    "annualMaintenance": "$2,250.00"
  },
  "timeline": {
    "installationTime": "5 days",
    "effectiveAfter": "3-6 months",
    "fullMaturity": "1-2 years"
  },
  "benefits": [
    "Reduce AQI from 185 to ~95",
    "10x more effective than traditional trees",
    "Clean air for ~50000 people",
    "Minimal water and maintenance required"
  ]
}
```

## Error Responses

All errors follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid or missing token)
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Example Error

```json
{
  "detail": "Prediction date must be in the future"
}
```

## Rate Limiting

- **Free tier**: 100 requests per hour
- **Authenticated**: 1000 requests per hour
- **Researcher tier**: 10000 requests per hour

## Data Models

### AQI Categories

| AQI Range | Category | Color |
|-----------|----------|-------|
| 0-50 | Good | Green |
| 51-100 | Moderate | Yellow |
| 101-150 | Unhealthy for Sensitive Groups | Orange |
| 151-200 | Unhealthy | Red |
| 201-300 | Very Unhealthy | Purple |
| 301+ | Hazardous | Maroon |

### Pollution Index Formula

```
PI = min((0.3 × Temperature) + (0.4 × PM2.5) + (1.2 × CO) - (0.8 × Altitude))
```

### Bio-Urban Tree Effectiveness

- **Oxygen Release**: 10x more than regular trees
- **Pollution Absorption**: ~100 units per tree per day
- **Coverage**: 1 tree per 0.02 sq km for optimal effect

## Code Examples

### JavaScript/TypeScript

```typescript
// Get pollution data
const response = await fetch(
  'http://localhost:8000/api/pollution/current?location=New Delhi'
);
const data = await response.json();
console.log(`Current AQI: ${data.aqi}`);

// Create prediction
const prediction = await fetch(
  'http://localhost:8000/api/prediction/predict',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location: 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
      predictionDate: '2026-06-15T00:00:00Z',
    }),
  }
);
const predictionData = await prediction.json();
```

### Python

```python
import requests

# Get pollution data
response = requests.get(
    'http://localhost:8000/api/pollution/current',
    params={'location': 'New Delhi'}
)
data = response.json()
print(f"Current AQI: {data['aqi']}")

# Create simulation
simulation = requests.post(
    'http://localhost:8000/api/simulation/simulate',
    json={
        'location': 'New Delhi, India',
        'latitude': 28.6139,
        'longitude': 77.2090,
        'area': 5.0,
        'currentAQI': 185,
        'currentPI': 87.5
    }
)
sim_data = simulation.json()
print(f"Trees needed: {sim_data['treesNeeded']}")
```

## Interactive API Docs

Visit http://localhost:8000/api/docs for interactive Swagger documentation where you can test all endpoints directly in your browser.

---

For more information, visit the [GitHub repository](https://github.com/dharmeshpriyadarshi/veridian).
