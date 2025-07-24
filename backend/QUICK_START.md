# 🚀 Quick Start Guide - Travel Booking API

## Problem Solved ✅
The original Pydantic installation issue has been resolved by using a virtual environment with compatible versions.

## Start the Backend in 30 seconds:

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Use the startup script (easiest way)
```bash
./start.sh
```

**OR manually:**

### 2a. Activate virtual environment
```bash
source venv/bin/activate
```

### 2b. Start the server
```bash
python simple_main.py
```

## ✅ Success! Your API is running at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **Health**: http://localhost:8000/health

## 🧪 Test the API:

### Browser Test:
Visit: http://localhost:8000

### Hotel Search Test:
Visit: http://localhost:8000/api/v1/search/hotels?destination=Paris

### Command Line Test:
```bash
curl http://localhost:8000/health
```

## 🔌 Connect to Frontend:

Your Next.js frontend can now make API calls to:
```javascript
const API_BASE = 'http://localhost:8000/api/v1';

// Example: Search hotels
fetch(`${API_BASE}/search/hotels?destination=London`)
  .then(res => res.json())
  .then(data => console.log(data));

// Example: Demo login
fetch(`${API_BASE}/auth/demo-login`, { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🛑 Stop the Server:
Press `Ctrl+C` in the terminal

---

🎉 **Your FastAPI backend is now running successfully!** 