# Veridian - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn ([Download](https://nodejs.org/))
- **Python** 3.10+ ([Download](https://www.python.org/downloads/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

### Optional but Recommended
- **VS Code** with extensions:
  - Python
  - Prisma
  - ESLint
  - Tailwind CSS IntelliSense

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/dharmeshpriyadarshi/veridian.git
cd veridian
```

### 2. Database Setup

#### Install PostgreSQL
If you haven't installed PostgreSQL yet:

**Windows:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and remember your password
3. PostgreSQL will run on default port 5432

**Create Database:**
```bash
# Open psql command line or pgAdmin
psql -U postgres

# In psql:
CREATE DATABASE veridian;
\q
```

### 3. Backend Setup (Python/FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux

# Edit .env file and update:
# - DATABASE_URL with your PostgreSQL credentials
# - SECRET_KEY (generate with: openssl rand -base64 32)
# - OPENWEATHER_API_KEY (get from https://openweathermap.org/api)

# Run the backend
uvicorn app.main:app --reload
```

Backend will run on: http://localhost:8000
API Docs: http://localhost:8000/api/docs

### 4. Frontend Setup (Next.js)

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env.local  # Windows
# cp .env.example .env.local  # macOS/Linux

# Edit .env.local and update:
# - DATABASE_URL (same as backend)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
# - MAPBOX_ACCESS_TOKEN (get from https://mapbox.com)
# - OPENWEATHER_API_KEY (same as backend)

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

Frontend will run on: http://localhost:3000

## 🔑 API Keys Required

### 1. OpenWeather API (Free)
- Visit: https://openweathermap.org/api
- Sign up for free account
- Get API key from dashboard
- Add to .env files

### 2. Mapbox Access Token (Free)
- Visit: https://www.mapbox.com/
- Sign up for free account
- Get access token from dashboard
- Add to frontend .env.local

## 🗄️ Database Schema

The database schema is defined in `frontend/prisma/schema.prisma`. Key models:
- **User**: User accounts and authentication
- **PollutionData**: Historical and real-time pollution data
- **Prediction**: ML-generated pollution predictions
- **Simulation**: Bio-urban tree simulation results

## 📊 ML Model Setup

Currently, the API uses mock predictions. To train and use actual ML models:

### 1. Download Dataset

```bash
# Create data directory
mkdir -p backend/data

# Download from Kaggle
# https://www.kaggle.com/datasets/totoro29/air-pollution-level
# Place CSV files in backend/data/
```

### 2. Train Model (Coming Soon)

```bash
cd backend
jupyter notebook

# Open notebooks/train_pollution_model.ipynb
# Follow instructions to train the model
```

## 🧪 Testing the Application

### Test Backend API

```bash
# With backend running, visit:
http://localhost:8000/api/docs

# Test endpoints:
1. GET /health - Check if API is running
2. POST /api/pollution/current - Get pollution data
3. POST /api/prediction/predict - Test prediction
4. POST /api/simulation/simulate - Test simulation
```

### Test Frontend

```bash
# With frontend running, visit:
http://localhost:3000

# You should see:
1. Landing page with features
2. Navigation to different pages
3. Beautiful UI with Tailwind CSS
```

## 🐛 Troubleshooting

### Backend Issues

**Issue: ModuleNotFoundError**
```bash
# Ensure virtual environment is activated
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**Issue: Database connection failed**
```bash
# Check PostgreSQL is running
# Windows: Check Services
# macOS: brew services list
# Linux: sudo systemctl status postgresql

# Verify DATABASE_URL in .env
# Format: postgresql://username:password@localhost:5432/veridian
```

**Issue: Port 8000 already in use**
```bash
# Run on different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**Issue: Module not found**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Prisma Client error**
```bash
# Regenerate Prisma client
npx prisma generate
npx prisma db push
```

**Issue: Port 3000 already in use**
```bash
# Next.js will automatically suggest port 3001
# Or manually specify:
npm run dev -- -p 3001
```

### Common Issues

**Issue: CORS errors**
- Ensure backend ALLOWED_ORIGINS includes frontend URL
- Check both servers are running

**Issue: Environment variables not loading**
- Frontend: Restart dev server after changing .env.local
- Backend: Restart uvicorn after changing .env
- Ensure PUBLIC_ prefix for client-side Next.js variables

## 📱 Project Structure Overview

```
veridian/
├── frontend/              # Next.js application
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities
│   └── prisma/          # Database schema
│
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── core/        # Configuration
│   │   └── schemas/     # Pydantic models
│   └── data/            # Datasets
│
└── docs/                # Documentation
```

## 🔄 Development Workflow

### Making Changes

1. **Frontend changes**: Files auto-reload on save
2. **Backend changes**: Auto-reload with --reload flag
3. **Database changes**: Update schema.prisma, then run:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### Running Both Servers

```bash
# Option 1: Two terminals
Terminal 1: cd backend && uvicorn app.main:app --reload
Terminal 2: cd frontend && npm run dev

# Option 2: Using concurrently (from root)
npm run dev:all
```

## 🚀 Next Steps

1. ✅ Complete setup following this guide
2. 📖 Read the main [README.md](../README.md)
3. 🗺️ Test the pollution monitoring features
4. 🌳 Try the bio-urban tree simulation
5. 🤖 Explore ML prediction capabilities
6. 📱 Customize the UI to your needs

## 💡 Tips

- Use **Chrome DevTools** for frontend debugging
- Use **FastAPI Docs** (http://localhost:8000/api/docs) to test APIs
- Check **Prisma Studio** for database GUI: `npx prisma studio`
- Enable **React DevTools** browser extension
- Use **VS Code** REST Client extension for API testing

## 📞 Need Help?

If you encounter issues:
1. Check this troubleshooting guide
2. Review error messages carefully
3. Check GitHub Issues
4. Verify all prerequisites are installed
5. Ensure all environment variables are set

---

**Ready to build a cleaner future! 🌱**
