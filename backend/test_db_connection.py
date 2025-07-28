#!/usr/bin/env python3
"""
Database connection test script for troubleshooting SQLite issues.
Run this script to verify your database connection is working properly.
"""

import asyncio
import sys
from sqlalchemy import text
from app.database.database import engine, Base
from app.core.config import settings

async def test_database_connection():
    """Test the database connection and basic operations."""
    print("🔍 Testing database connection...")
    print(f"📍 Database URL: {settings.database_url}")
    
    try:
        # Test basic connection
        async with engine.begin() as conn:
            result = await conn.execute(text('SELECT 1 as test'))
            row = result.fetchone()
            print(f"✅ Basic connection test passed: {row[0]}")
            
        # Test table creation
        print("\n🔍 Testing table creation...")
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            print("✅ Tables created/verified successfully")
            
        # Test table listing
        print("\n🔍 Listing existing tables...")
        async with engine.begin() as conn:
            result = await conn.execute(text(
                "SELECT name FROM sqlite_master WHERE type='table'"
            ))
            tables = result.fetchall()
            if tables:
                print("📋 Found tables:")
                for table in tables:
                    print(f"   - {table[0]}")
            else:
                print("⚠️  No tables found")
                
        print("\n✅ All database tests passed!")
        return True
        
    except Exception as e:
        print(f"\n❌ Database connection failed: {e}")
        return False
    finally:
        await engine.dispose()

async def main():
    """Main test function."""
    print("🚀 Starting database connection tests...\n")
    success = await test_database_connection()
    
    if success:
        print("\n🎉 Database is working correctly!")
        sys.exit(0)
    else:
        print("\n💥 Database tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main()) 