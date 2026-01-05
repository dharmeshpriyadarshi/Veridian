# Veridian - Pollution Analysis & Prediction Platform

## 🌱 Project Overview

Veridian is an advanced multi-page platform that analyzes real-time pollution data and generates predictions for future pollution levels. The platform simulates the impact of bio-urban trees (algae-treated water plants that release 10x more oxygen than natural trees) on pollution reduction.

## ✨ Key Features

### 1. Real-Time Pollution Monitoring
- Search-based location pollution level checker
- Current air quality index (AQI) display
- Real-time environmental data for user locations

### 2. Pollution Prediction (2026)
- ML-powered predictions for upcoming year
- Date-specific pollution level forecasting
- Interactive map visualization of predicted pollution levels
- Pattern recognition and pollution spread analysis

### 3. Bio-Urban Tree Simulation
- Calculate optimal number of bio-urban trees needed
- Visualize tree placement on interactive maps
- Simulate pollution reduction effects
- Formula: `PI = min((0.3×T) + (0.4×PM) + (1.2×CO) - (0.8×AT))`

### 4. Research Portal
- Exclusive access for students, professors, and researchers
- Advanced analytics and insights
- Pollution trend analysis
- Credentialed authentication system

### 5. User Management
- Secure login/signup system
- Profile customization
- Settings and preferences
- User-specific data tracking

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router) with TypeScript
- **React 18** with Server Components
- **Tailwind CSS** + **shadcn/ui** for modern UI
- **Mapbox GL JS** for map visualization
- **Chart.js / Recharts** for data visualization
- **NextAuth.js** for authentication
- **React Query** for data fetching
- **Zustand** for state management

### Backend
- **Python FastAPI** for ML model serving
- **Node.js** with Next.js API routes
- **Prisma ORM** with PostgreSQL
- **TensorFlow/Scikit-learn** for ML predictions
- **Redis** for caching
- **JWT** for token-based auth

### Machine Learning
- **TensorFlow/Keras** for time-series prediction
- **Pandas & NumPy** for data processing
- **Scikit-learn** for preprocessing
- NASA Air Pollution Dataset (Kaggle)

### DevOps & Tools
- **Git & GitHub** for version control
- **Docker** for containerization
- **Vercel** for frontend deployment
- **Railway/Render** for backend deployment
- **GitHub Actions** for CI/CD

## 📁 Project Structure

```
veridian/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Protected dashboard pages
│   │   ├── api/            # API routes
│   │   └── ...
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── map/           # Map visualization components
│   │   ├── charts/        # Chart components
│   │   └── ...
│   ├── lib/               # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   └── public/            # Static assets
├── backend/                # Python FastAPI backend
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── models/        # ML models
│   │   ├── services/      # Business logic
│   │   ├── schemas/       # Pydantic schemas
│   │   └── core/          # Config & utilities
│   ├── data/              # Dataset storage
│   ├── notebooks/         # Jupyter notebooks for model training
│   └── tests/             # Backend tests
├── ml-models/             # Trained ML models
├── prisma/                # Database schema
└── docs/                  # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.10+
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dharmeshpriyadarshi/veridian.git
cd veridian
```

2. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
# Configure environment variables
npm run dev
```

3. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure environment variables
uvicorn app.main:app --reload
```

4. **Database Setup**
```bash
cd frontend
npx prisma generate
npx prisma db push
```

## 🔑 Environment Variables

### Frontend (.env.local)
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
MAPBOX_ACCESS_TOKEN="..."
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

### Backend (.env)
```env
DATABASE_URL="postgresql://..."
SECRET_KEY="..."
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENWEATHER_API_KEY="..."
```

## 📊 ML Model Training

The pollution prediction model uses historical NASA pollution data to forecast 2026 levels.

```bash
cd backend/notebooks
jupyter notebook
# Open and run train_pollution_model.ipynb
```

## 🗺 Map Visualization

The platform uses Mapbox GL JS for interactive map visualization:
- Real-time pollution heatmaps
- Predicted pollution overlays
- Bio-urban tree placement simulation
- Pollution spread pattern visualization

## 🔐 Authentication

- **Standard Users**: Email/password authentication
- **Researchers**: Additional credential verification system
  - Academic email verification
  - Institution validation
  - Manual approval process

## 📈 Pollution Index Formula

```
PI = min((0.3 × Temperature) + (0.4 × PM2.5) + (1.2 × CO) - (0.8 × Altitude))
```

Where:
- T = Temperature (°C)
- PM = Particulate Matter 2.5 (μg/m³)
- CO = Carbon Monoxide (ppm)
- AT = Altitude (meters)

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
pytest
```

## 📦 Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Railway/Render)
```bash
# Push to main branch, auto-deploys via GitHub Actions
git push origin main
```

## 🤝 Contributing

This is a final year project by Dharmesh Priyadarshi. Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Dharmesh Priyadarshi**
- GitHub: [@dharmeshpriyadarshi](https://github.com/dharmeshpriyadarshi)

## 🙏 Acknowledgments

- NASA for air pollution datasets
- OpenWeatherMap API for real-time pollution data
- Kaggle for additional datasets
- Bio-urban tree research community

---

**Note**: This is an academic project developed for final year requirements. Ensure all APIs and services are properly configured before deployment.
