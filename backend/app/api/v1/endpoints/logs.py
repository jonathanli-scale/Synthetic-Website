from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any, Dict, List
from datetime import datetime
import json

from app.database.database import get_db
from app.models.models import EventLog
from app.schemas.schemas import EventLogCreate, EventLogResponse
from pydantic import BaseModel

router = APIRouter()

class FrontendEventRequest(BaseModel):
    type: str
    text: str
    timestamp: str
    user_id: str = None
    session_id: str = None
    # Dynamic fields based on event type
    page_url: str = None
    element_identifier: str = None
    coordinates: Dict[str, int] = None
    scroll_x: int = None
    scroll_y: int = None
    key: str = None
    target_url: str = None
    storage_type: str = None
    key: str = None
    value: str = None
    custom_action: str = None
    data: Dict[str, Any] = None

@router.post("/events")
async def log_frontend_event(
    event: FrontendEventRequest,
    db: Session = Depends(get_db)
):
    """
    Log events sent from the frontend
    """
    try:
        # Create event log entry
        event_log = EventLog(
            event_type=event.type,
            description=event.text,
            user_id=event.user_id,
            session_id=event.session_id,
            timestamp=datetime.fromisoformat(event.timestamp.replace('Z', '+00:00')),
            event_metadata=event.dict(exclude={'type', 'text', 'timestamp', 'user_id', 'session_id'}),
            source='frontend'
        )
        
        db.add(event_log)
        db.commit()
        db.refresh(event_log)
        
        return {"status": "success", "event_id": event_log.id}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to log event: {str(e)}")

@router.get("/events")
async def get_events(
    limit: int = 100,
    offset: int = 0,
    user_id: str = None,
    session_id: str = None,
    event_type: str = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve logged events with optional filtering
    """
    try:
        query = db.query(EventLog)
        
        if user_id:
            query = query.filter(EventLog.user_id == user_id)
        if session_id:
            query = query.filter(EventLog.session_id == session_id)
        if event_type:
            query = query.filter(EventLog.event_type == event_type)
            
        events = query.order_by(EventLog.timestamp.desc()).offset(offset).limit(limit).all()
        
        return {
            "events": [
                {
                    "id": event.id,
                    "event_type": event.event_type,
                    "description": event.description,
                    "user_id": event.user_id,
                    "session_id": event.session_id,
                    "timestamp": event.timestamp.isoformat(),
                    "metadata": event.event_metadata,
                    "source": event.source
                }
                for event in events
            ],
            "total": query.count()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve events: {str(e)}")

async def log_db_update_async(
    db,  # Can be sync or async session
    text: str,
    table_name: str,
    update_type: str,
    values: Dict[str, Any],
    user_id: str = None
):
    """
    Helper function to log database updates (async version)
    """
    try:
        event_log = EventLog(
            event_type='DB_UPDATE',
            description=text,
            user_id=user_id,
            timestamp=datetime.utcnow(),
            event_metadata={
                'table_name': table_name,
                'update_type': update_type,
                'values': values
            },
            source='backend'
        )
        
        db.add(event_log)
        await db.commit()
        
    except Exception as e:
        print(f"Failed to log DB update: {e}")
        # Don't raise exception to avoid breaking the main operation

def log_db_update(
    db: Session,
    text: str,
    table_name: str,
    update_type: str,
    values: Dict[str, Any],
    user_id: str = None
):
    """
    Helper function to log database updates (sync version)
    """
    try:
        event_log = EventLog(
            event_type='DB_UPDATE',
            description=text,
            user_id=user_id,
            timestamp=datetime.utcnow(),
            event_metadata={
                'table_name': table_name,
                'update_type': update_type,
                'values': values
            },
            source='backend'
        )
        
        db.add(event_log)
        db.commit()
        
    except Exception as e:
        print(f"Failed to log DB update: {e}")
        # Don't raise exception to avoid breaking the main operation 