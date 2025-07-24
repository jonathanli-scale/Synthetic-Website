from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    bookings = relationship("Booking", back_populates="user")


class Hotel(Base):
    __tablename__ = "hotels"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=False)
    address = Column(String, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    star_rating = Column(Integer, nullable=False)
    price_per_night = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    
    # Hotel features
    amenities = Column(JSON, nullable=True)  # ["WiFi", "Pool", "Spa", etc.]
    images = Column(JSON, nullable=True)     # ["url1", "url2", etc.]
    room_types = Column(JSON, nullable=True) # [{"type": "Standard", "price": 150}, etc.]
    
    # Status
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    bookings = relationship("Booking", back_populates="hotel")


class Flight(Base):
    __tablename__ = "flights"
    
    id = Column(Integer, primary_key=True, index=True)
    airline = Column(String, nullable=False)
    flight_number = Column(String, nullable=False, index=True)
    
    # Route information
    departure_airport = Column(String, nullable=False)
    arrival_airport = Column(String, nullable=False)
    departure_city = Column(String, nullable=False)
    arrival_city = Column(String, nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    
    # Flight details
    duration_minutes = Column(Integer, nullable=False)
    stops = Column(Integer, default=0)
    aircraft_type = Column(String, nullable=True)
    cabin_class = Column(String, nullable=False)  # economy, business, first
    
    # Pricing
    price = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    seats_available = Column(Integer, nullable=False)
    
    # Additional info
    baggage_info = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    bookings = relationship("Booking", back_populates="flight")


class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_reference = Column(String, unique=True, nullable=False, index=True)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    hotel_id = Column(Integer, ForeignKey("hotels.id"), nullable=True)
    flight_id = Column(Integer, ForeignKey("flights.id"), nullable=True)
    
    # Booking details
    booking_type = Column(String, nullable=False)  # hotel, flight, package
    status = Column(String, nullable=False, default="pending")  # pending, confirmed, cancelled
    
    # Dates
    check_in_date = Column(DateTime, nullable=True)
    check_out_date = Column(DateTime, nullable=True)
    booking_date = Column(DateTime(timezone=True), server_default=func.now())
    
    # Guest information
    guest_details = Column(JSON, nullable=True)  # {"adults": 2, "children": 0, "rooms": 1}
    traveler_info = Column(JSON, nullable=True)  # [{"name": "John Doe", "email": "...", etc}]
    
    # Pricing
    total_price = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    payment_status = Column(String, default="pending")  # pending, paid, refunded
    
    # Additional info
    special_requests = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="bookings")
    hotel = relationship("Hotel", back_populates="bookings")
    flight = relationship("Flight", back_populates="bookings")


class Destination(Base):
    __tablename__ = "destinations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    country = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    
    # Location
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Popularity metrics
    popularity_score = Column(Float, default=0.0)
    average_rating = Column(Float, nullable=True)
    
    # Status
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Deal(Base):
    __tablename__ = "deals"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    deal_type = Column(String, nullable=False)  # hotel, flight, package
    
    # Deal details
    original_price = Column(Float, nullable=False)
    discounted_price = Column(Float, nullable=False)
    discount_percentage = Column(Integer, nullable=True)
    currency = Column(String, default="USD")
    
    # Validity
    valid_from = Column(DateTime, nullable=False)
    valid_until = Column(DateTime, nullable=False)
    
    # Display
    image_url = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now()) 