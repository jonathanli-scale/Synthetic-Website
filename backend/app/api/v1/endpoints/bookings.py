from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
import uuid
from app.database.database import get_db
from app.models.models import User, Booking
from app.schemas.schemas import Booking as BookingSchema, BookingCreate
from app.core.deps import get_current_active_user
from app.api.v1.endpoints.logs import log_db_update_async

router = APIRouter()


@router.post("/", response_model=BookingSchema, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking_data: BookingCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new booking."""
    # Generate unique booking reference
    booking_reference = f"TRV-{uuid.uuid4().hex[:8].upper()}"
    
    # Create booking
    db_booking = Booking(
        booking_reference=booking_reference,
        user_id=current_user.id,
        hotel_id=booking_data.hotel_id,
        flight_id=booking_data.flight_id,
        booking_type=booking_data.booking_type,
        check_in_date=booking_data.check_in_date,
        check_out_date=booking_data.check_out_date,
        guest_details=booking_data.guest_details,
        traveler_info=booking_data.traveler_info,
        total_price=booking_data.total_price,
        currency=booking_data.currency,
        special_requests=booking_data.special_requests
    )
    
    db.add(db_booking)
    await db.commit()
    await db.refresh(db_booking)
    
    # Log the database insert
    await log_db_update_async(
        db=db,
        text=f"Created new booking {booking_reference} for user {current_user.email}",
        table_name="bookings",
        update_type="insert",
        values={
            "booking_reference": booking_reference,
            "user_id": current_user.id,
            "booking_type": booking_data.booking_type,
            "total_price": booking_data.total_price
        },
        user_id=str(current_user.id)
    )
    
    return db_booking


@router.get("/", response_model=List[BookingSchema])
async def get_user_bookings(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all bookings for the current user."""
    result = await db.execute(
        select(Booking)
        .options(selectinload(Booking.hotel), selectinload(Booking.flight))
        .where(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.desc())
    )
    bookings = result.scalars().all()
    
    return bookings


@router.get("/{booking_id}", response_model=BookingSchema)
async def get_booking(
    booking_id: int,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get specific booking details."""
    result = await db.execute(
        select(Booking)
        .options(selectinload(Booking.hotel), selectinload(Booking.flight))
        .where(Booking.id == booking_id, Booking.user_id == current_user.id)
    )
    booking = result.scalar_one_or_none()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    return booking 