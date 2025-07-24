from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from typing import List, Optional
from app.database.database import get_db
from app.models.models import Hotel, Flight, Destination, Deal
from app.schemas.schemas import Hotel as HotelSchema, Flight as FlightSchema, Destination as DestinationSchema, Deal as DealSchema

router = APIRouter()


@router.get("/hotels", response_model=List[HotelSchema])
async def search_hotels(
    destination: Optional[str] = Query(None, description="Destination city or location"),
    check_in: Optional[str] = Query(None, description="Check-in date"),
    check_out: Optional[str] = Query(None, description="Check-out date"),
    guests: int = Query(2, ge=1, description="Number of guests"),
    rooms: int = Query(1, ge=1, description="Number of rooms"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    star_rating: Optional[int] = Query(None, ge=1, le=5, description="Minimum star rating"),
    sort_by: str = Query("price", description="Sort by: price, rating, name"),
    limit: int = Query(20, ge=1, le=100, description="Number of results"),
    db: AsyncSession = Depends(get_db)
):
    """Search for hotels with filters."""
    query = select(Hotel).where(Hotel.is_active == True)
    
    # Apply filters
    if destination:
        query = query.where(
            or_(
                Hotel.location.ilike(f"%{destination}%"),
                Hotel.name.ilike(f"%{destination}%"),
                Hotel.address.ilike(f"%{destination}%")
            )
        )
    
    if min_price:
        query = query.where(Hotel.price_per_night >= min_price)
    
    if max_price:
        query = query.where(Hotel.price_per_night <= max_price)
    
    if star_rating:
        query = query.where(Hotel.star_rating >= star_rating)
    
    # Apply sorting
    if sort_by == "price":
        query = query.order_by(Hotel.price_per_night)
    elif sort_by == "rating":
        query = query.order_by(Hotel.star_rating.desc())
    elif sort_by == "name":
        query = query.order_by(Hotel.name)
    
    query = query.limit(limit)
    
    result = await db.execute(query)
    hotels = result.scalars().all()
    
    return hotels


@router.get("/flights", response_model=List[FlightSchema])
async def search_flights(
    departure_city: Optional[str] = Query(None, description="Departure city"),
    arrival_city: Optional[str] = Query(None, description="Arrival city"),
    departure_date: Optional[str] = Query(None, description="Departure date"),
    return_date: Optional[str] = Query(None, description="Return date"),
    passengers: int = Query(1, ge=1, description="Number of passengers"),
    cabin_class: Optional[str] = Query(None, description="Cabin class: economy, business, first"),
    max_stops: Optional[int] = Query(None, ge=0, description="Maximum number of stops"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    sort_by: str = Query("price", description="Sort by: price, duration, departure_time"),
    limit: int = Query(20, ge=1, le=100, description="Number of results"),
    db: AsyncSession = Depends(get_db)
):
    """Search for flights with filters."""
    query = select(Flight).where(Flight.is_active == True)
    
    # Apply filters
    if departure_city:
        query = query.where(Flight.departure_city.ilike(f"%{departure_city}%"))
    
    if arrival_city:
        query = query.where(Flight.arrival_city.ilike(f"%{arrival_city}%"))
    
    if cabin_class:
        query = query.where(Flight.cabin_class == cabin_class)
    
    if max_stops is not None:
        query = query.where(Flight.stops <= max_stops)
    
    if min_price:
        query = query.where(Flight.price >= min_price)
    
    if max_price:
        query = query.where(Flight.price <= max_price)
    
    # Apply sorting
    if sort_by == "price":
        query = query.order_by(Flight.price)
    elif sort_by == "duration":
        query = query.order_by(Flight.duration_minutes)
    elif sort_by == "departure_time":
        query = query.order_by(Flight.departure_time)
    
    query = query.limit(limit)
    
    result = await db.execute(query)
    flights = result.scalars().all()
    
    return flights


@router.get("/destinations", response_model=List[DestinationSchema])
async def get_popular_destinations(
    featured_only: bool = Query(False, description="Only featured destinations"),
    limit: int = Query(10, ge=1, le=50, description="Number of results"),
    db: AsyncSession = Depends(get_db)
):
    """Get popular destinations."""
    query = select(Destination).where(Destination.is_active == True)
    
    if featured_only:
        query = query.where(Destination.is_featured == True)
    
    query = query.order_by(Destination.popularity_score.desc()).limit(limit)
    
    result = await db.execute(query)
    destinations = result.scalars().all()
    
    return destinations


@router.get("/deals", response_model=List[DealSchema])
async def get_deals(
    deal_type: Optional[str] = Query(None, description="Deal type: hotel, flight, package"),
    featured_only: bool = Query(False, description="Only featured deals"),
    limit: int = Query(10, ge=1, le=50, description="Number of results"),
    db: AsyncSession = Depends(get_db)
):
    """Get current deals and offers."""
    query = select(Deal).where(Deal.is_active == True)
    
    if deal_type:
        query = query.where(Deal.deal_type == deal_type)
    
    if featured_only:
        query = query.where(Deal.is_featured == True)
    
    query = query.order_by(Deal.discount_percentage.desc()).limit(limit)
    
    result = await db.execute(query)
    deals = result.scalars().all()
    
    return deals 