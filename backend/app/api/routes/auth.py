from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.schemas import (
    UserCreate,
    UserLogin,
    UserResponse,
    Token
)
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token
)
from datetime import timedelta
from app.core.config import settings

router = APIRouter()

# In-memory storage for demo (replace with database in production)
users_db = {}

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    """Register a new user."""
    # Check if user already exists
    if user.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    hashed_password = get_password_hash(user.password)
    user_id = f"user_{len(users_db) + 1}"
    
    user_data = {
        "id": user_id,
        "email": user.email,
        "name": user.name,
        "password": hashed_password,
        "role": "USER",
        "isResearcher": False,
        "createdAt": "2026-01-05T00:00:00Z"
    }
    
    users_db[user.email] = user_data
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user_id}
    )
    
    user_response = UserResponse(**{k: v for k, v in user_data.items() if k != "password"})
    
    return Token(access_token=access_token, user=user_response)

@router.post("/signin", response_model=Token)
async def signin(credentials: UserLogin):
    """Authenticate a user and return a token."""
    # Find user
    user_data = users_db.get(credentials.email)
    
    if not user_data or not verify_password(credentials.password, user_data["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": credentials.email, "user_id": user_data["id"]}
    )
    
    user_response = UserResponse(**{k: v for k, v in user_data.items() if k != "password"})
    
    return Token(access_token=access_token, user=user_response)

@router.get("/me", response_model=UserResponse)
async def get_current_user():
    """Get current user information."""
    # This would normally use the JWT token to identify the user
    # For demo purposes, return a mock user
    return UserResponse(
        id="user_1",
        email="demo@veridian.com",
        name="Demo User",
        role="USER",
        isResearcher=False,
        createdAt="2026-01-05T00:00:00Z"
    )
