from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.database import get_db
from app.models.models import Hotel
from app.schemas.schemas import Hotel as HotelSchema

router = APIRouter()


@router.get("/{hotel_id}", response_model=HotelSchema)
async def get_hotel(hotel_id: int, db: AsyncSession = Depends(get_db)):
    """Get hotel details by ID."""
    result = await db.execute(select(Hotel).where(Hotel.id == hotel_id))
    hotel = result.scalar_one_or_none()
    
    if not hotel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel not found"
        )
    
    return hotel 