from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.schemas.schemas import SimulationRequest, SimulationResponse, TreePlacement
import random
import math
import json

router = APIRouter()

def calculate_bio_urban_trees(current_aqi: int, current_pi: float, area: float) -> int:
    """
    Calculate number of bio-urban trees needed.
    Bio-urban trees are 10x more effective than regular trees.
    """
    # Formula: trees_needed = (pollution_index * area) / tree_effectiveness
    # One bio-urban tree can clean approximately 100 units of pollution per day
    tree_effectiveness = 100
    
    # Use pollution index and AQI to determine severity
    pollution_severity = (current_pi + current_aqi) / 2
    
    trees_needed = math.ceil((pollution_severity * area) / tree_effectiveness)
    
    # Ensure minimum of 1 tree and maximum practical limit
    return max(1, min(trees_needed, int(area * 100)))  # Max 100 trees per sq km

def calculate_projected_reduction(trees: int, current_aqi: int, area: float) -> tuple[float, int]:
    """
    Calculate the projected pollution reduction from bio-urban trees.
    Returns: (reduction_percentage, projected_aqi)
    """
    # Each tree reduces pollution by a certain percentage
    # Bio-urban trees are 10x more effective (each tree = ~0.5% reduction per sq km)
    reduction_per_tree = 0.5 / area if area > 0 else 0.5
    
    total_reduction = min(trees * reduction_per_tree, 70)  # Cap at 70% reduction
    
    projected_aqi = max(0, int(current_aqi * (1 - total_reduction / 100)))
    
    return round(total_reduction, 2), projected_aqi

def generate_tree_placements(latitude: float, longitude: float, trees: int, area: float) -> list[dict]:
    """
    Generate strategic tree placements within the area.
    Trees are placed in a grid pattern for optimal coverage.
    """
    placements = []
    
    # Calculate grid dimensions based on area
    grid_size = math.ceil(math.sqrt(trees))
    
    # Calculate degree offset based on area (rough approximation)
    # 1 degree ≈ 111 km
    offset = math.sqrt(area) / 111 / grid_size
    
    for i in range(grid_size):
        for j in range(grid_size):
            if len(placements) >= trees:
                break
            
            # Add some randomness to avoid perfect grid
            lat_offset = (i - grid_size/2) * offset + random.uniform(-offset/4, offset/4)
            lon_offset = (j - grid_size/2) * offset + random.uniform(-offset/4, offset/4)
            
            placements.append({
                "latitude": round(latitude + lat_offset, 6),
                "longitude": round(longitude + lon_offset, 6),
                "treeCount": 1
            })
    
    return placements

@router.post("/simulate", response_model=SimulationResponse)
async def create_simulation(request: SimulationRequest):
    """
    Simulate bio-urban tree planting and its impact on pollution.
    """
    # Validate input
    if request.area <= 0:
        raise HTTPException(status_code=400, detail="Area must be positive")
    
    if request.currentAQI < 0 or request.currentAQI > 500:
        raise HTTPException(status_code=400, detail="AQI must be between 0 and 500")
    
    # Calculate number of trees needed
    trees_needed = calculate_bio_urban_trees(
        request.currentAQI,
        request.currentPI,
        request.area
    )
    
    # Calculate projected reduction
    reduction_percentage, projected_aqi = calculate_projected_reduction(
        trees_needed,
        request.currentAQI,
        request.area
    )
    
    # Generate tree placements
    tree_placements = generate_tree_placements(
        request.latitude,
        request.longitude,
        trees_needed,
        request.area
    )
    
    # Create response
    response = {
        "id": f"sim_{random.randint(1000, 9999)}",
        "location": request.location,
        "latitude": request.latitude,
        "longitude": request.longitude,
        "area": request.area,
        "currentAQI": request.currentAQI,
        "currentPI": request.currentPI,
        "treesNeeded": trees_needed,
        "projectedReduction": reduction_percentage,
        "projectedAQI": projected_aqi,
        "treePlacements": json.dumps(tree_placements),
        "createdAt": datetime.now().isoformat()
    }
    
    return SimulationResponse(**response)

@router.get("/recommendations")
async def get_tree_recommendations(
    location: str,
    latitude: float,
    longitude: float,
    current_aqi: int,
    area: float = 1.0
):
    """
    Get recommendations for bio-urban tree planting.
    """
    # Calculate basic pollution index (simplified)
    current_pi = current_aqi * 0.5
    
    trees_needed = calculate_bio_urban_trees(current_aqi, current_pi, area)
    reduction_percentage, projected_aqi = calculate_projected_reduction(
        trees_needed,
        current_aqi,
        area
    )
    
    # Calculate cost estimate (assuming $500 per bio-urban tree)
    estimated_cost = trees_needed * 500
    
    # Calculate maintenance estimate (10% of cost per year)
    annual_maintenance = estimated_cost * 0.1
    
    return {
        "location": location,
        "analysis": {
            "currentAQI": current_aqi,
            "currentCategory": get_aqi_category(current_aqi),
            "treesRecommended": trees_needed,
            "projectedReduction": f"{reduction_percentage}%",
            "projectedAQI": projected_aqi,
            "projectedCategory": get_aqi_category(projected_aqi)
        },
        "economics": {
            "estimatedCost": f"${estimated_cost:,}",
            "costPerTree": "$500",
            "annualMaintenance": f"${annual_maintenance:,.2f}"
        },
        "timeline": {
            "installationTime": f"{math.ceil(trees_needed / 10)} days",
            "effectiveAfter": "3-6 months",
            "fullMaturity": "1-2 years"
        },
        "benefits": [
            f"Reduce AQI from {current_aqi} to ~{projected_aqi}",
            f"10x more effective than traditional trees",
            f"Clean air for ~{int(area * 10000)} people",
            "Minimal water and maintenance required"
        ]
    }

def get_aqi_category(aqi: int) -> str:
    """Get AQI category name."""
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups"
    elif aqi <= 200:
        return "Unhealthy"
    elif aqi <= 300:
        return "Very Unhealthy"
    else:
        return "Hazardous"
