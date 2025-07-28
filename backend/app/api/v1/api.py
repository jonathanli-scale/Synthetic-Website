from fastapi import APIRouter
from app.api.v1.endpoints import auth, hotels, flights, bookings, users, search, logs

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(search.router, prefix="/search", tags=["Search"])
api_router.include_router(hotels.router, prefix="/hotels", tags=["Hotels"])
api_router.include_router(flights.router, prefix="/flights", tags=["Flights"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
api_router.include_router(logs.router, prefix="/logs", tags=["Logging"]) 