#!/usr/bin/env python3
"""Simplified FastAPI app for testing."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Travel Booking API - Simple",
    version="1.0.0",
    description="A simplified travel booking API for testing"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Travel Booking API",
        "status": "working",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "travel-booking-api"}

@app.get("/api/v1/search/hotels")
async def search_hotels(destination: str = None):
    """Simplified hotel search endpoint."""
    return {
        "hotels": [
            {
                "id": 1,
                "name": "Grand Hotel",
                "location": destination or "London",
                "price_per_night": 150.0,
                "star_rating": 4
            },
            {
                "id": 2,
                "name": "City Inn",
                "location": destination or "London",
                "price_per_night": 89.0,
                "star_rating": 3
            }
        ],
        "total_count": 2
    }

@app.post("/api/v1/auth/demo-login")
async def demo_login():
    """Demo login endpoint."""
    return {
        "access_token": "demo-token-123", 
        "token_type": "bearer"
    }

if __name__ == "__main__":
    uvicorn.run(
        "simple_main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 