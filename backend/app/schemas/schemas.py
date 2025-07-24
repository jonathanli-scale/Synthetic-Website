from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


# Enum definitions
class BookingStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"


class PaymentStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    refunded = "refunded"


class CabinClass(str, Enum):
    economy = "economy"
    business = "business"
    first = "first"


# Base schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None


class User(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# Hotel schemas
class HotelBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: str
    address: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    star_rating: int = Field(..., ge=1, le=5)
    price_per_night: float = Field(..., gt=0)
    currency: str = "USD"
    amenities: Optional[List[str]] = []
    images: Optional[List[str]] = []
    room_types: Optional[List[Dict[str, Any]]] = []


class HotelCreate(HotelBase):
    pass


class HotelUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    address: Optional[str] = None
    star_rating: Optional[int] = Field(None, ge=1, le=5)
    price_per_night: Optional[float] = Field(None, gt=0)
    amenities: Optional[List[str]] = None
    images: Optional[List[str]] = None
    room_types: Optional[List[Dict[str, Any]]] = None


class Hotel(HotelBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Flight schemas
class FlightBase(BaseModel):
    airline: str
    flight_number: str
    departure_airport: str
    arrival_airport: str
    departure_city: str
    arrival_city: str
    departure_time: datetime
    arrival_time: datetime
    duration_minutes: int
    stops: int = 0
    aircraft_type: Optional[str] = None
    cabin_class: CabinClass
    price: float = Field(..., gt=0)
    currency: str = "USD"
    seats_available: int = Field(..., ge=0)
    baggage_info: Optional[Dict[str, Any]] = {}


class FlightCreate(FlightBase):
    pass


class FlightUpdate(BaseModel):
    price: Optional[float] = Field(None, gt=0)
    seats_available: Optional[int] = Field(None, ge=0)
    baggage_info: Optional[Dict[str, Any]] = None


class Flight(FlightBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Booking schemas
class BookingBase(BaseModel):
    booking_type: str
    check_in_date: Optional[datetime] = None
    check_out_date: Optional[datetime] = None
    guest_details: Optional[Dict[str, Any]] = {}
    traveler_info: Optional[List[Dict[str, Any]]] = []
    special_requests: Optional[str] = None


class BookingCreate(BookingBase):
    hotel_id: Optional[int] = None
    flight_id: Optional[int] = None
    total_price: float = Field(..., gt=0)
    currency: str = "USD"


class BookingUpdate(BaseModel):
    status: Optional[BookingStatus] = None
    payment_status: Optional[PaymentStatus] = None
    special_requests: Optional[str] = None


class Booking(BookingBase):
    id: int
    booking_reference: str
    user_id: int
    hotel_id: Optional[int] = None
    flight_id: Optional[int] = None
    status: BookingStatus
    booking_date: datetime
    total_price: float
    currency: str
    payment_status: PaymentStatus
    created_at: datetime
    updated_at: datetime
    
    # Related objects
    hotel: Optional[Hotel] = None
    flight: Optional[Flight] = None
    
    class Config:
        from_attributes = True


# Destination schemas
class DestinationBase(BaseModel):
    name: str
    country: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    popularity_score: float = 0.0
    average_rating: Optional[float] = None


class DestinationCreate(DestinationBase):
    pass


class Destination(DestinationBase):
    id: int
    is_featured: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Deal schemas
class DealBase(BaseModel):
    title: str
    description: Optional[str] = None
    deal_type: str
    original_price: float = Field(..., gt=0)
    discounted_price: float = Field(..., gt=0)
    discount_percentage: Optional[int] = None
    currency: str = "USD"
    valid_from: datetime
    valid_until: datetime
    image_url: Optional[str] = None


class DealCreate(DealBase):
    pass


class Deal(DealBase):
    id: int
    is_featured: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Search schemas
class HotelSearchParams(BaseModel):
    destination: Optional[str] = None
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    guests: int = 2
    rooms: int = 1
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    star_rating: Optional[int] = None
    amenities: Optional[List[str]] = []


class FlightSearchParams(BaseModel):
    departure_city: Optional[str] = None
    arrival_city: Optional[str] = None
    departure_date: Optional[datetime] = None
    return_date: Optional[datetime] = None
    passengers: int = 1
    cabin_class: Optional[CabinClass] = None
    max_stops: Optional[int] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None


# Response schemas
class SearchResponse(BaseModel):
    hotels: Optional[List[Hotel]] = []
    flights: Optional[List[Flight]] = []
    total_count: int
    page: int
    per_page: int
    has_next: bool
    has_prev: bool 