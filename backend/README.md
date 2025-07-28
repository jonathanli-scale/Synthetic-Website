# Travel Booking API 🚀

A high-performance, lightweight backend API for the travel booking platform built with FastAPI, SQLAlchemy, and SQLite.

## ✨ Features

- **FastAPI Framework**: Modern, fast web framework with automatic API documentation
- **Async/Await Support**: Non-blocking database operations for high performance
- **JWT Authentication**: Secure user authentication and authorization
- **SQLite Database**: Lightweight, file-based database perfect for containerization
- **Auto-Generated Docs**: Interactive API documentation at `/docs`
- **Type Safety**: Full Python type hints with Pydantic validation
- **Docker Ready**: Containerized for easy deployment

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/v1/endpoints/    # API route handlers
│   ├── core/                # Configuration and security
│   ├── database/            # Database connection and setup
│   ├── models/              # SQLAlchemy models
│   └── schemas/             # Pydantic schemas
├── tests/                   # Test files
├── requirements.txt         # Python dependencies
├── Dockerfile              # Container configuration
└── docker-compose.yml     # Development setup
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- pip or conda

### Installation

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install fastapi "uvicorn[standard]" sqlalchemy aiosqlite python-dotenv
   ```

5. **Run development server:**
   ```bash
   python simple_main.py
   # OR use the startup script:
   ./start.sh
   ```

6. **Access the API:**
   - API: http://localhost:8000
   - Interactive docs: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

### Using Docker

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the API at http://localhost:8000**

## 📊 Database Models

### Core Entities
- **Users**: User accounts with authentication
- **Hotels**: Hotel listings with amenities and pricing
- **Flights**: Flight schedules with route and pricing info
- **Bookings**: User reservations linking hotels/flights
- **Destinations**: Popular travel destinations
- **Deals**: Special offers and promotions

### Key Features
- **Relationships**: Proper foreign keys and joins
- **JSON Fields**: Flexible data storage for amenities, images, etc.
- **Timestamps**: Automatic created/updated tracking
- **Soft Deletes**: is_active flags for data retention

## 🔐 Authentication

### JWT Token System
- **Registration**: POST `/api/v1/auth/register`
- **Login**: POST `/api/v1/auth/login`
- **Demo Login**: POST `/api/v1/auth/demo-login`

### Protected Routes
All booking and user management endpoints require authentication:
```bash
Authorization: Bearer <your-jwt-token>
```

## 🛣️ API Endpoints

### Search & Discovery
```
GET /api/v1/search/hotels?destination=London&guests=2
GET /api/v1/search/flights?departure_city=NYC&arrival_city=London
GET /api/v1/search/destinations?featured_only=true
GET /api/v1/search/deals?deal_type=hotel
```

### Booking Management
```
POST /api/v1/bookings/          # Create booking
GET  /api/v1/bookings/          # Get user bookings
GET  /api/v1/bookings/{id}      # Get specific booking
```

### User Management
```
GET /api/v1/users/me            # Get current user
PUT /api/v1/users/me            # Update profile
```

### Hotel & Flight Details
```
GET /api/v1/hotels/{id}         # Hotel details
GET /api/v1/flights/{id}        # Flight details
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
DATABASE_URL=sqlite+aiosqlite:///travel_booking.db
SECRET_KEY=your-super-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=http://localhost:3000
```

### CORS Setup
The API is configured to accept requests from:
- http://localhost:3000 (Next.js frontend)
- http://127.0.0.1:3000

## 📝 Data Validation

All endpoints use Pydantic schemas for:
- **Input Validation**: Automatic request validation
- **Output Serialization**: Consistent response format
- **Type Safety**: Runtime type checking
- **Documentation**: Auto-generated API docs

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## 🚢 Deployment

### Docker Production
```bash
docker build -t travel-booking-api .
docker run -p 8000:8000 travel-booking-api
```

### Environment Variables for Production
- `SECRET_KEY`: Strong secret key
- `DATABASE_URL`: Production database URL
- `ALLOWED_ORIGINS`: Frontend domain(s)

## 📖 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🤝 Integration with Frontend

The API is designed to work seamlessly with the Next.js frontend:

1. **Authentication**: JWT tokens for secure communication
2. **Search**: Flexible search parameters matching frontend forms
3. **CORS**: Configured for frontend domain
4. **Response Format**: JSON responses matching frontend expectations

## 🔍 Monitoring

- **Health Check**: GET `/health`
- **Root Endpoint**: GET `/` (API info)
- **Logs**: Structured logging with uvicorn

---

🎯 **Ready to power your travel booking platform!** 