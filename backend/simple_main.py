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
    
    all_hotels = [
        {
            "id": 1,
            "name": "Grand Luxury Hotel Paris",
            "location": "Paris, France",
            "price_per_night": 289.0,
            "star_rating": 5,
            "rating": 4.8,
            "amenities": ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym"]
        },
        {
            "id": 2,
            "name": "Tokyo Bay Resort",
            "location": "Tokyo, Japan", 
            "price_per_night": 245.0,
            "star_rating": 4,
            "rating": 4.6,
            "amenities": ["Free WiFi", "Restaurant", "Bar", "Business Center"]
        },
        {
            "id": 3,
            "name": "Manhattan Boutique Hotel",
            "location": "New York, USA",
            "price_per_night": 199.0,
            "star_rating": 4,
            "rating": 4.4,
            "amenities": ["Free WiFi", "Fitness Center", "Restaurant"]
        },
        {
            "id": 4,
            "name": "Swiss Alpine Lodge",
            "location": "Zermatt, Switzerland",
            "price_per_night": 320.0,
            "star_rating": 4,
            "rating": 4.7,
            "amenities": ["Free WiFi", "Ski Storage", "Spa", "Mountain Views"]
        },
        {
            "id": 5,
            "name": "Santorini Sunset Resort",
            "location": "Santorini, Greece",
            "price_per_night": 450.0,
            "star_rating": 5,
            "rating": 4.9,
            "amenities": ["Infinity Pool", "Sunset Views", "Spa", "Restaurant"]
        },
        {
            "id": 6,
            "name": "Dubai Marina Tower Hotel",
            "location": "Dubai, UAE",
            "price_per_night": 350.0,
            "star_rating": 5,
            "rating": 4.6,
            "amenities": ["Rooftop Pool", "Free WiFi", "Multiple Restaurants", "Beach Access"]
        },
        {
            "id": 7,
            "name": "Costa Rica Eco Lodge",
            "location": "Manuel Antonio, Costa Rica",
            "price_per_night": 180.0,
            "star_rating": 3,
            "rating": 4.5,
            "amenities": ["Nature Tours", "Free WiFi", "Wildlife Viewing", "Eco-Friendly"]
        },
        {
            "id": 8,
            "name": "Kyoto Traditional Ryokan",
            "location": "Kyoto, Japan",
            "price_per_night": 280.0,
            "star_rating": 4,
            "rating": 4.8,
            "amenities": ["Traditional Baths", "Zen Garden", "Kaiseki Dining", "Tea Ceremony"]
        },
        {
            "id": 9,
            "name": "Sydney Harbor Hotel",
            "location": "Sydney, Australia",
            "price_per_night": 380.0,
            "star_rating": 5,
            "rating": 4.7,
            "amenities": ["Harbor Views", "Rooftop Bar", "Free WiFi", "Concierge"]
        },
        {
            "id": 10,
            "name": "Marrakech Riad Palace",
            "location": "Marrakech, Morocco",
            "price_per_night": 160.0,
            "star_rating": 4,
            "rating": 4.4,
            "amenities": ["Rooftop Terrace", "Hammam Spa", "Traditional Decor", "Free WiFi"]
        }
    ]
    
    # Filter by destination if provided
    if destination:
        filtered_hotels = [
            hotel for hotel in all_hotels 
            if destination.lower() in hotel["location"].lower() or 
               destination.lower() in hotel["name"].lower()
        ]
    else:
        filtered_hotels = all_hotels
    
    return {
        "hotels": filtered_hotels,
        "total_count": len(filtered_hotels)
    }

@app.post("/api/v1/auth/demo-login")
async def demo_login():
    """Demo login endpoint."""
    return {
        "access_token": "demo-token-123", 
        "token_type": "bearer",
        "user": {
            "id": 1,
            "email": "demo@example.com",
            "firstName": "Demo",
            "lastName": "User",
            "createdAt": "2024-01-01T00:00:00Z"
        }
    }

@app.get("/api/v1/users/me")
async def get_current_user():
    """Get current user info."""
    return {
        "id": 1,
        "email": "demo@example.com",
        "firstName": "Demo",
        "lastName": "User",
        "createdAt": "2024-01-01T00:00:00Z"
    }

@app.post("/api/v1/bookings/")
async def create_booking(booking_data: dict):
    """Create a new booking."""
    import uuid
    import datetime
    
    booking_id = f"TRV-{uuid.uuid4().hex[:8].upper()}"
    
    return {
        "id": len(booking_id),
        "booking_reference": booking_id,
        "user_id": 1,
        "booking_type": booking_data.get("booking_type", "hotel"),
        "status": "confirmed",
        "booking_date": datetime.datetime.now().isoformat(),
        "total_price": booking_data.get("total_price", 0),
        "currency": booking_data.get("currency", "USD"),
        "guest_details": booking_data.get("guest_details", {}),
        "traveler_info": booking_data.get("traveler_info", []),
        "created_at": datetime.datetime.now().isoformat(),
        "updated_at": datetime.datetime.now().isoformat()
    }

@app.get("/api/v1/bookings/")
async def get_user_bookings():
    """Get user bookings."""
    # Return empty array initially, bookings will be stored in frontend Redux
    return []

if __name__ == "__main__":
    uvicorn.run(
        "simple_main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 