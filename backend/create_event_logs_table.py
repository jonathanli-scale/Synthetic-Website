#!/usr/bin/env python3
"""
Database migration script to create the event_logs table.
Run this script to set up event logging in your database.

Usage:
    python create_event_logs_table.py
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from app.core.config import settings
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_event_logs_table():
    """Create the event_logs table and indexes"""
    
    # Convert async URL to sync for migration
    sync_url = settings.database_url.replace("sqlite+aiosqlite://", "sqlite:///")
    print(sync_url)
    engine = create_engine(sync_url)
    
    # SQL to create the table
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS event_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        user_id VARCHAR(50),
        session_id VARCHAR(100),
        timestamp DATETIME NOT NULL,
        metadata JSON,
        source VARCHAR(20) NOT NULL DEFAULT 'frontend',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    # SQL to create indexes
    create_indexes_sql = [
        "CREATE INDEX IF NOT EXISTS idx_event_logs_event_type ON event_logs(event_type);",
        "CREATE INDEX IF NOT EXISTS idx_event_logs_user_id ON event_logs(user_id);", 
        "CREATE INDEX IF NOT EXISTS idx_event_logs_session_id ON event_logs(session_id);",
        "CREATE INDEX IF NOT EXISTS idx_event_logs_timestamp ON event_logs(timestamp);",
        "CREATE INDEX IF NOT EXISTS idx_event_logs_source ON event_logs(source);",
        "CREATE INDEX IF NOT EXISTS idx_event_logs_created_at ON event_logs(created_at);"
    ]
    
    try:
        with engine.connect() as connection:
            # Create the table
            logger.info("Creating event_logs table...")
            connection.execute(text(create_table_sql))
            connection.commit()
            logger.info("✅ event_logs table created successfully")
            
            # Create indexes
            logger.info("Creating indexes...")
            for index_sql in create_indexes_sql:
                connection.execute(text(index_sql))
                connection.commit()
            logger.info("✅ All indexes created successfully")
            
            # Verify table creation
            verify_sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='event_logs';"
            result = connection.execute(text(verify_sql))
            if result.fetchone():
                logger.info("✅ Table verification successful")
                
                # Show table structure
                structure_sql = "PRAGMA table_info(event_logs);"
                columns = connection.execute(text(structure_sql)).fetchall()
                logger.info("📋 Table structure:")
                for col in columns:
                    logger.info(f"   {col[1]} ({col[2]}) - {col[3] and 'NOT NULL' or 'NULLABLE'}")
                    
            else:
                logger.error("❌ Table verification failed")
                return False
                
    except Exception as e:
        logger.error(f"❌ Error creating event_logs table: {e}")
        return False
    
    return True

def insert_sample_events():
    """Insert some sample events for testing"""
    
    # Convert async URL to sync for migration
    sync_url = settings.database_url.replace("sqlite+aiosqlite://", "sqlite:///")
    engine = create_engine(sync_url)
    
    sample_events = [
        {
            "event_type": "CLICK",
            "description": "User clicked on hotel search button",
            "user_id": "demo_user_1",
            "session_id": "session_123456789",
            "timestamp": "2024-03-15 10:30:00",
            "metadata": '{"page_url": "http://localhost:3003/", "element_identifier": "#search-btn", "coordinates": {"x": 150, "y": 45}}',
            "source": "frontend"
        },
        {
            "event_type": "CUSTOM",
            "description": "User searched for hotels in Paris for 2 guests",
            "user_id": "demo_user_1", 
            "session_id": "session_123456789",
            "timestamp": "2024-03-15 10:30:15", 
            "metadata": '{"custom_action": "hotel_search", "data": {"destination": "Paris", "guests": 2, "checkIn": "2024-03-20", "checkOut": "2024-03-22"}}',
            "source": "frontend"
        },
        {
            "event_type": "DB_UPDATE",
            "description": "Created new booking TRV-ABC123 for user demo@example.com",
            "user_id": "demo_user_1",
            "session_id": "session_123456789", 
            "timestamp": "2024-03-15 10:35:00",
            "metadata": '{"table_name": "bookings", "update_type": "insert", "values": {"booking_reference": "TRV-ABC123", "user_id": 1, "total_price": 299.99}}',
            "source": "backend"
        }
    ]
    
    insert_sql = """
    INSERT INTO event_logs (event_type, description, user_id, session_id, timestamp, metadata, source)
    VALUES (:event_type, :description, :user_id, :session_id, :timestamp, :metadata, :source)
    """
    
    try:
        with engine.connect() as connection:
            logger.info("Inserting sample events...")
            for event in sample_events:
                connection.execute(text(insert_sql), event)
            connection.commit()
            logger.info(f"✅ Inserted {len(sample_events)} sample events")
            
            # Verify insertion
            count_sql = "SELECT COUNT(*) FROM event_logs;"
            count = connection.execute(text(count_sql)).scalar()
            logger.info(f"📊 Total events in database: {count}")
            
    except Exception as e:
        logger.error(f"❌ Error inserting sample events: {e}")
        return False
        
    return True

def main():
    """Main function to run the migration"""
    
    logger.info("🚀 Starting event logging database migration...")
    
    # Create table and indexes
    if not create_event_logs_table():
        logger.error("❌ Migration failed at table creation")
        sys.exit(1)
    
    # Ask user if they want sample data
    response = input("\n📝 Would you like to insert sample events for testing? (y/N): ")
    if response.lower() in ['y', 'yes']:
        if not insert_sample_events():
            logger.error("❌ Failed to insert sample events")
            sys.exit(1)
    
    logger.info("🎉 Event logging migration completed successfully!")
    logger.info("\n📚 Next steps:")
    logger.info("1. Restart your backend server")
    logger.info("2. Check the LOGGING_GUIDE.md for usage examples")
    logger.info("3. Test logging by visiting http://localhost:3003 and interacting with the site")
    logger.info("4. View logs at http://localhost:8000/api/v1/logs/events")

if __name__ == "__main__":
    main() 