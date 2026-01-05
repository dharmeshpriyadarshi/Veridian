# 🚀 How to Use Veridian - Complete Guide

## 📋 Table of Contents
1. [First-Time Setup](#first-time-setup)
2. [Starting the Application](#starting-the-application)
3. [Using the Web App](#using-the-web-app)
4. [Features Walkthrough](#features-walkthrough)
5. [Troubleshooting](#troubleshooting)

---

## 🎯 First-Time Setup

### Step 1: Install Prerequisites

#### Install Node.js (Required)
1. Go to https://nodejs.org/
2. Download **LTS version** (18 or higher)
3. Run installer, accept defaults
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

#### Install Python (Required)
1. Go to https://www.python.org/downloads/
2. Download **Python 3.10 or higher**
3. **IMPORTANT**: Check "Add Python to PATH" during installation
4. Verify installation:
   ```powershell
   python --version
   ```

#### Install PostgreSQL (Required)
1. Go to https://www.postgresql.org/download/windows/
2. Download and run installer
3. During installation:
   - Remember your **password** (you'll need this!)
   - Default port: 5432 (keep it)
   - Install all components
4. After installation, open **SQL Shell (psql)**:
   - Press Enter for all prompts (use defaults)
   - Enter your password when asked
   - Create database:
     ```sql
     CREATE DATABASE veridian;
     \q
     ```

### Step 2: Project Setup (NO API KEYS NEEDED!)

Open **PowerShell** or **Command Prompt**:

```powershell
# Navigate to your project
cd "c:\Users\dharm\Desktop\Veridian M"

# Install root dependencies
npm install
```

#### Setup Backend

```powershell
# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it (you'll see (venv) in your prompt)
.\venv\Scripts\activate

# Install Python packages (this takes 2-3 minutes)
pip install -r requirements.txt

# Create environment file
copy .env.example .env

# Edit .env file
notepad .env
```

**In notepad, update these lines:**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/veridian
SECRET_KEY=any-random-long-string-at-least-32-characters-long
```
Replace `YOUR_PASSWORD` with the PostgreSQL password you set during installation.

**Save and close** the file.

#### Setup Frontend

Open a **NEW PowerShell window**:

```powershell
# Go to frontend folder
cd "c:\Users\dharm\Desktop\Veridian M\frontend"

# Install packages (this takes 3-5 minutes)
npm install

# Create environment file
copy .env.example .env.local

# Edit .env.local file
notepad .env.local
```

**In notepad, update these lines:**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/veridian
NEXTAUTH_SECRET=any-other-random-long-string-at-least-32-characters
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```
Replace `YOUR_PASSWORD` with your PostgreSQL password.

**Save and close** the file.

```powershell
# Setup database
npx prisma generate
npx prisma db push
```

✅ **Setup Complete!** You only need to do this once.

---

## 🚀 Starting the Application

### Every Time You Want to Use Veridian:

#### Terminal 1: Start Backend

```powershell
# Open PowerShell
cd "c:\Users\dharm\Desktop\Veridian M\backend"

# Activate virtual environment
.\venv\Scripts\activate

# Start backend server
uvicorn app.main:app --reload
```

**You should see:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ **Backend is running!** Keep this window open.

#### Terminal 2: Start Frontend

```powershell
# Open NEW PowerShell window
cd "c:\Users\dharm\Desktop\Veridian M\frontend"

# Start frontend server
npm run dev
```

**You should see:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

✅ **Frontend is running!** Keep this window open too.

### Open Your Browser

1. Open **Chrome** or **Firefox**
2. Go to: **http://localhost:3000**
3. You should see the Veridian homepage! 🎉

---

## 🌐 Using the Web App

### Homepage (What You See First)

When you first open http://localhost:3000, you'll see:

1. **Navigation Bar** at the top:
   - **Veridian** logo (click to go home)
   - **Insights** - View pollution data
   - **Simulation** - Simulate tree planting
   - **Research** - For researchers (needs special access)
   - **Sign In** button
   - **Get Started** button

2. **Hero Section**:
   - Big title: "Breathe Better with Veridian"
   - Description of what Veridian does
   - Two buttons:
     - **Get Started Free** - Sign up
     - **Try Simulation** - Go directly to simulation

3. **Features Section**:
   - Real-Time Monitoring
   - ML-Powered Predictions
   - Bio-Urban Tree Simulation
   - Research Portal

4. **How It Works**:
   - 4 steps showing the process

5. **Statistics**:
   - Project data and capabilities

### Creating an Account

1. Click **"Get Started"** or **"Sign In"**
2. You'll be taken to sign-up page (to be built)
3. For now, the backend is ready - you'll add the UI later

### API Testing (For Developers)

While building the UI, you can test the backend:

1. Open: **http://localhost:8000/api/docs**
2. You'll see **Swagger UI** with all API endpoints
3. Click any endpoint to test it:
   - **Try it out**
   - Fill in parameters
   - **Execute**
   - See the response!

**Example: Test Pollution Data**

1. Go to http://localhost:8000/api/docs
2. Find **`GET /api/pollution/current`**
3. Click **"Try it out"**
4. Enter location: `New Delhi`
5. Click **"Execute"**
6. You'll see pollution data in the response!

```json
{
  "location": "New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "pm25": 125.5,
  "aqi": 185,
  "temperature": 25.5
  // ... more data
}
```

---

## 🎨 Features Walkthrough

### 1. Real-Time Pollution Monitoring

**What it does:** Shows current pollution levels for any location.

**How to use (when UI is built):**
1. Go to **Insights** page
2. Enter your city name in search bar
3. Click **Search**
4. See current AQI, PM2.5, and other pollutants
5. View on map with color-coded zones

**API Endpoint:** `GET /api/pollution/current?location=CityName`

### 2. Pollution Prediction

**What it does:** Predicts pollution levels for any date in 2026.

**How to use:**
1. Go to **Simulation** page
2. Select a location on the map
3. Choose a future date (in 2026)
4. Click **Predict**
5. See predicted AQI and PM2.5 levels
6. View confidence score

**API Endpoint:** `POST /api/prediction/predict`

**Request:**
```json
{
  "location": "Mumbai, India",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "predictionDate": "2026-06-15T00:00:00Z"
}
```

### 3. Bio-Urban Tree Simulation

**What it does:** Calculates how many bio-urban trees needed to reduce pollution.

**How to use:**
1. Go to **Simulation** page
2. Select an area on the map
3. Enter current pollution level (or auto-detect)
4. Click **Simulate**
5. See:
   - Number of trees needed
   - Projected pollution reduction (%)
   - New AQI after planting trees
   - Tree placement suggestions on map
   - Cost estimates

**API Endpoint:** `POST /api/simulation/simulate`

**Request:**
```json
{
  "location": "Delhi NCR",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "area": 5.0,
  "currentAQI": 185,
  "currentPI": 87.5
}
```

**Response:**
```json
{
  "treesNeeded": 45,
  "projectedReduction": 48.5,
  "projectedAQI": 95,
  "treePlacements": "[{...}]"
}
```

### 4. Research Portal

**What it does:** Provides advanced analytics for researchers.

**Access:** Requires researcher verification.

**Features (when built):**
- Historical pollution trends
- Pattern recognition
- Data export for research papers
- Advanced visualizations

---

## 🗺️ Map Features (Using OpenStreetMap)

**No API key needed!** We use OpenStreetMap which is completely free.

### What You Can Do on Maps:

1. **View Pollution Heatmap**
   - Color-coded zones (green = good, red = hazardous)
   - Click any point to see detailed data

2. **Place Bio-Urban Trees**
   - Click to place a tree
   - See pollution reduction in real-time
   - Get optimal placement suggestions

3. **Compare Predictions**
   - Select different dates
   - See how pollution changes over time
   - Identify patterns

4. **Interactive Controls**
   - Zoom in/out
   - Pan around
   - Toggle layers (pollution, trees, predictions)

---

## 📊 Understanding the Data

### Air Quality Index (AQI)

| AQI Range | Category | What It Means |
|-----------|----------|---------------|
| 0-50 | Good | ✅ Air quality is excellent |
| 51-100 | Moderate | ⚠️ Acceptable, but sensitive groups should be careful |
| 101-150 | Unhealthy for Sensitive | 🟠 Children, elderly, people with respiratory issues should limit outdoor activities |
| 151-200 | Unhealthy | 🔴 Everyone should reduce outdoor activities |
| 201-300 | Very Unhealthy | 🟣 Health alert - avoid outdoor activities |
| 301+ | Hazardous | ⚫ Emergency conditions - stay indoors |

### Pollutants Explained

- **PM2.5**: Fine particles (2.5 micrometers)
  - Most dangerous
  - Gets deep into lungs

- **PM10**: Coarse particles (10 micrometers)
  - Can irritate airways

- **CO**: Carbon Monoxide
  - Colorless, odorless gas
  - From vehicles and factories

- **NO2**: Nitrogen Dioxide
  - From vehicle emissions

- **O3**: Ozone
  - Ground-level ozone (bad)

### Bio-Urban Trees

- **What are they?** Algae-treated water plants
- **Why special?** Release **10x more oxygen** than regular trees
- **How effective?** 1 bio-urban tree = 10 regular trees
- **Maintenance:** Minimal, less water needed

---

## 🔄 Daily Workflow

### As a Regular User

1. **Morning Check:**
   ```
   Open Veridian → Check today's AQI → Decide outdoor activities
   ```

2. **Planning Ahead:**
   ```
   Check predictions for next week → Plan events accordingly
   ```

3. **Community Action:**
   ```
   Run simulation for your area → Share results with local authorities
   ```

### As a Researcher

1. **Data Collection:**
   ```
   Export historical data → Analyze trends → Publish findings
   ```

2. **Pattern Analysis:**
   ```
   Compare different regions → Identify pollution sources → Recommend solutions
   ```

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to backend"

**Solution:**
```powershell
# Check if backend is running
# You should see it in Terminal 1
# If not, restart:
cd backend
.\venv\Scripts\activate
uvicorn app.main:app --reload
```

### Problem: "Database connection failed"

**Solution:**
```powershell
# Check PostgreSQL is running
# Open Services (Win + R, type "services.msc")
# Find "postgresql-x64-14" 
# If stopped, right-click → Start

# Or from PowerShell:
net start postgresql-x64-14
```

### Problem: "Page not found" on http://localhost:3000

**Solution:**
```powershell
# Check if frontend is running
# You should see it in Terminal 2
# If not, restart:
cd frontend
npm run dev
```

### Problem: "Module not found" errors

**Solution:**
```powershell
# Frontend:
cd frontend
Remove-Item -Recurse -Force node_modules
npm install

# Backend:
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

### Problem: Port already in use

**Backend (Port 8000):**
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID)
taskkill /PID <NUMBER> /F

# Or use different port
uvicorn app.main:app --reload --port 8001
```

**Frontend (Port 3000):**
```powershell
# Next.js will automatically suggest 3001
# Just press Y when asked
```

---

## 📱 Accessing from Other Devices

### On Same WiFi Network

1. Find your computer's IP address:
   ```powershell
   ipconfig
   # Look for "IPv4 Address" under your WiFi adapter
   # Example: 192.168.1.10
   ```

2. On your phone/tablet, open browser:
   ```
   http://YOUR_IP:3000
   # Example: http://192.168.1.10:3000
   ```

3. Make sure your firewall allows connections

---

## 🎯 Next Steps

### Building the Remaining Pages

1. **Start with Authentication**
   - Create sign-in page
   - Create sign-up page
   - Test user registration

2. **Build Insights Page**
   - Add location search
   - Display pollution data
   - Add charts

3. **Add Map Integration**
   - Install Leaflet (already in package.json)
   - Create map component
   - Add pollution markers

4. **Complete Simulation Page**
   - Interactive tree placement
   - Real-time calculations
   - Visualization

5. **Research Portal**
   - Researcher verification
   - Advanced analytics
   - Data export

---

## 💡 Tips for Best Experience

1. **Use Chrome or Firefox** for best compatibility
2. **Keep both terminals open** while using the app
3. **Refresh page** if data doesn't load
4. **Check browser console** (F12) for errors
5. **Test API endpoints** in Swagger UI first

---

## 📞 Need Help?

1. **Check this guide** first
2. **Look at error messages** - they usually tell you what's wrong
3. **Check if servers are running** - both terminals should be active
4. **Verify database** - PostgreSQL should be running
5. **Check documentation:**
   - [QUICKSTART.md](QUICKSTART.md)
   - [docs/SETUP.md](docs/SETUP.md)
   - [docs/API.md](docs/API.md)

---

## 🎉 You're Ready!

Start both servers and open http://localhost:3000 to begin using Veridian!

**Happy Pollution Fighting! 🌱🌍💚**
