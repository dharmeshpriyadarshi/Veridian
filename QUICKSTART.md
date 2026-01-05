# Veridian - Quick Start Commands

## 📋 Prerequisites Check

```powershell
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check Python version (should be 3.10+)
python --version

# Check PostgreSQL (should be installed)
psql --version

# Check Git
git --version
```

## 🗄️ Database Setup

```powershell
# Start PostgreSQL (Windows Service)
# Check Services or run:
net start postgresql-x64-14

# Create database
psql -U postgres
# In psql prompt:
CREATE DATABASE veridian;
\q
```

## 🐍 Backend Setup

```powershell
# Navigate to backend
cd "c:\Users\dharm\Desktop\Veridian M\backend"

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Edit .env file with your settings
notepad .env

# Run backend server
uvicorn app.main:app --reload
```

Backend will be available at: **http://localhost:8000**  
API Documentation: **http://localhost:8000/api/docs**

## ⚛️ Frontend Setup

```powershell
# Open NEW terminal window
# Navigate to frontend
cd "c:\Users\dharm\Desktop\Veridian M\frontend"

# Install dependencies
npm install

# Copy environment file
copy .env.example .env.local

# Edit .env.local with your settings
notepad .env.local

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

## 🔑 Required API Keys

### 1. OpenWeather API (Free)
```
1. Visit: https://openweathermap.org/api
2. Sign up for free
3. Get API key from dashboard
4. Add to both .env files:
   - backend/.env: OPENWEATHER_API_KEY=your_key
   - frontend/.env.local: NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key
```

### 2. Mapbox Token (Free)
```
1. Visit: https://www.mapbox.com/
2. Sign up for free
3. Get access token
4. Add to frontend/.env.local:
   - MAPBOX_ACCESS_TOKEN=your_token
   - NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

### 3. Generate Secrets
```powershell
# Generate NEXTAUTH_SECRET (frontend/.env.local)
# Option 1: Use OpenSSL (if installed)
openssl rand -base64 32

# Option 2: Use online generator
# Visit: https://generate-secret.vercel.app/32

# Add to frontend/.env.local:
NEXTAUTH_SECRET=generated_secret_here

# Generate SECRET_KEY for backend (backend/.env)
# Use same method as above
```

## 🧪 Testing

### Test Backend
```powershell
# Visit in browser:
http://localhost:8000/api/docs

# Or use curl/Invoke-WebRequest:
Invoke-WebRequest -Uri http://localhost:8000/health
```

### Test Frontend
```
# Visit in browser:
http://localhost:3000

# You should see the Veridian homepage
```

## 📊 Database Management

```powershell
# View database in Prisma Studio
cd frontend
npx prisma studio

# This opens GUI at http://localhost:5555
```

## 🐛 Common Issues & Fixes

### Port Already in Use

**Backend (Port 8000):**
```powershell
# Find process using port
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
uvicorn app.main:app --reload --port 8001
```

**Frontend (Port 3000):**
```powershell
# Next.js will automatically suggest port 3001
# Or specify manually:
npm run dev -- -p 3001
```

### Database Connection Failed
```powershell
# Check PostgreSQL is running
Get-Service *postgres*

# Start if stopped
Start-Service postgresql-x64-14

# Verify connection string in .env:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/veridian"
# Make sure password is correct!
```

### Module Not Found (Backend)
```powershell
# Ensure virtual environment is activated
# You should see (venv) in prompt

# If not:
.\venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Module Not Found (Frontend)
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Prisma Issues
```powershell
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: Deletes data)
npx prisma db push --force-reset

# View Prisma schema issues
npx prisma validate
```

## 🚀 Running Both Servers

### Option 1: Two Terminal Windows
```powershell
# Terminal 1 - Backend
cd "c:\Users\dharm\Desktop\Veridian M\backend"
.\venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd "c:\Users\dharm\Desktop\Veridian M\frontend"
npm run dev
```

### Option 2: Using Concurrently (from root)
```powershell
# From project root
npm run dev:all
```

## 📝 Development Workflow

```powershell
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
cd frontend && npm install
cd ../backend && pip install -r requirements.txt

# 3. Update database if schema changed
cd ../frontend && npx prisma db push

# 4. Start development servers (both terminals)

# 5. Make your changes

# 6. Test thoroughly

# 7. Commit and push
git add .
git commit -m "feat: Your feature description"
git push origin main
```

## 🔄 Update Dependencies

```powershell
# Frontend
cd frontend
npm update

# Backend
cd backend
pip install --upgrade -r requirements.txt
```

## 🧹 Clean Restart

```powershell
# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules, .next
npm install
npm run dev

# Backend
cd backend
Remove-Item -Recurse -Force __pycache__, .pytest_cache
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📦 Build for Production

### Frontend
```powershell
cd frontend
npm run build
npm run start
```

### Backend
```powershell
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 🌐 Environment Variables Reference

### Frontend (.env.local)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/veridian"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
MAPBOX_ACCESS_TOKEN="your-mapbox-token"
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
NEXT_PUBLIC_API_URL="http://localhost:8000"
OPENWEATHER_API_KEY="your-openweather-key"
NEXT_PUBLIC_OPENWEATHER_API_KEY="your-openweather-key"
```

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/veridian"
SECRET_KEY="your-secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=10080
OPENWEATHER_API_KEY="your-openweather-key"
ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
DEBUG=True
```

## 📞 Getting Help

- Check [SETUP.md](./docs/SETUP.md) for detailed setup
- Check [API.md](./docs/API.md) for API documentation
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Open an issue on GitHub

---

**Happy Development! 🌱**
