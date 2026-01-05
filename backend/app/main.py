from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import pollution, prediction, simulation, auth

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Veridian - Pollution Analysis & Prediction Platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(pollution.router, prefix="/api/pollution", tags=["Pollution"])
app.include_router(prediction.router, prefix="/api/prediction", tags=["Prediction"])
app.include_router(simulation.router, prefix="/api/simulation", tags=["Simulation"])

@app.get("/")
async def root():
    return {
        "message": "Veridian API",
        "version": "1.0.0",
        "docs": "/api/docs",
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
