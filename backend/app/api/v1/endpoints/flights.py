from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.database import get_db
from app.models.models import Flight
from app.schemas.schemas import Flight as FlightSchema

router = APIRouter()


@router.get("/{flight_id}", response_model=FlightSchema)
async def get_flight(flight_id: int, db: AsyncSession = Depends(get_db)):
    """Get flight details by ID."""
    result = await db.execute(select(Flight).where(Flight.id == flight_id))
    flight = result.scalar_one_or_none()
    
    if not flight:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flight not found"
        )
    
    return flight 