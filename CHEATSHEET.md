# 🎯 QUICK REFERENCE - Veridian Commands

## 🚀 Start Development (Every Time)

### Terminal 1 - Backend
```powershell
cd "c:\Users\dharm\Desktop\Veridian M\backend"
.\venv\Scripts\activate
uvicorn app.main:app --reload
```
**Opens on:** http://localhost:8000  
**API Docs:** http://localhost:8000/api/docs

### Terminal 2 - Frontend
```powershell
cd "c:\Users\dharm\Desktop\Veridian M\frontend"
npm run dev
```
**Opens on:** http://localhost:3000

---

## 📍 Important URLs

| URL | What It Shows |
|-----|---------------|
| http://localhost:3000 | 🌐 Main Website |
| http://localhost:8000/api/docs | 📚 API Documentation (Swagger) |
| http://localhost:8000/health | ✅ Backend Health Check |
| http://localhost:5555 | 💾 Database GUI (run `npx prisma studio`) |

---

## 🔧 Common Commands

### Frontend Commands
```powershell
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting errors
npm run lint -- --fix

# Update dependencies
npm update

# Clean install
Remove-Item -Recurse -Force node_modules
npm install
```

### Backend Commands
```powershell
cd backend
.\venv\Scripts\activate

# Start server
uvicorn app.main:app --reload

# Start on different port
uvicorn app.main:app --reload --port 8001

# Run tests (when added)
pytest

# Format code
black app/

# Check code quality
flake8 app/

# Update dependencies
pip install --upgrade -r requirements.txt
```

### Database Commands
```powershell
cd frontend

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open database GUI
npx prisma studio

# Create migration
npx prisma migrate dev

# Reset database (⚠️ DELETES ALL DATA)
npx prisma db push --force-reset

# View schema
npx prisma validate
```

### Git Commands
```powershell
cd "c:\Users\dharm\Desktop\Veridian M"

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "your message here"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature/feature-name
```

---

## 🐛 Quick Fixes

### "Port already in use"
```powershell
# Backend (8000)
netstat -ano | findstr :8000
taskkill /PID <NUMBER> /F

# Frontend (3000) - Just say Yes to use 3001
```

### "Database connection failed"
```powershell
# Start PostgreSQL
net start postgresql-x64-14

# Check if running
Get-Service *postgres*
```

### "Module not found"
```powershell
# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
npm install

# Backend
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

### "Prisma client not generated"
```powershell
cd frontend
npx prisma generate
```

### Clean Restart Everything
```powershell
# Stop all servers (Ctrl+C in both terminals)

# Backend
cd backend
Remove-Item -Recurse -Force __pycache__
.\venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules, .next
npm install
npx prisma generate

# Restart both servers
```

---

## 📊 Test API Endpoints

### Using Swagger UI (Easiest)
1. Open: http://localhost:8000/api/docs
2. Click any endpoint
3. Click "Try it out"
4. Fill parameters
5. Click "Execute"

### Using PowerShell
```powershell
# Get current pollution
Invoke-WebRequest -Uri "http://localhost:8000/api/pollution/current?location=Delhi" | Select-Object -Expand Content

# Health check
Invoke-WebRequest -Uri "http://localhost:8000/health" | Select-Object -Expand Content
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/veridian
SECRET_KEY=any-long-random-string-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### Frontend (.env.local)
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/veridian
NEXTAUTH_SECRET=another-long-random-string-min-32-chars
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📱 Access from Other Devices

### Find Your IP
```powershell
ipconfig
# Look for "IPv4 Address"
# Example: 192.168.1.10
```

### Access from Phone/Tablet
```
http://YOUR_IP:3000
# Example: http://192.168.1.10:3000
```

---

## 🎯 API Examples

### Get Pollution Data
```json
GET /api/pollution/current?location=Mumbai

Response:
{
  "location": "Mumbai, India",
  "aqi": 125,
  "pm25": 62.5,
  "temperature": 28.5
}
```

### Predict Future Pollution
```json
POST /api/prediction/predict

Body:
{
  "location": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "predictionDate": "2026-06-15T00:00:00Z"
}

Response:
{
  "predictedAQI": 120,
  "confidence": 0.85
}
```

### Simulate Trees
```json
POST /api/simulation/simulate

Body:
{
  "location": "Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "area": 5.0,
  "currentAQI": 150,
  "currentPI": 75.0
}

Response:
{
  "treesNeeded": 38,
  "projectedReduction": 42.5,
  "projectedAQI": 86
}
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [SIMPLE_GUIDE.md](SIMPLE_GUIDE.md) | ⭐ **START HERE** - Simple step-by-step |
| [HOW_TO_USE.md](HOW_TO_USE.md) | Detailed usage guide |
| [QUICKSTART.md](QUICKSTART.md) | All commands in one place |
| [README.md](README.md) | Project overview |
| [docs/SETUP.md](docs/SETUP.md) | Detailed setup with troubleshooting |
| [docs/API.md](docs/API.md) | Complete API reference |
| [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md) | How to push to GitHub |

---

## ✅ Pre-Flight Checklist

Before starting work:
- [ ] PostgreSQL is running
- [ ] Backend terminal is open and running
- [ ] Frontend terminal is open and running
- [ ] No errors in either terminal
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:8000/api/docs

---

## 🎨 Building UI Pages - Order

1. **Authentication** (2-3 days)
   - Sign in page: `frontend/app/(auth)/signin/page.tsx`
   - Sign up page: `frontend/app/(auth)/signup/page.tsx`

2. **Insights** (3-4 days)
   - Main page: `frontend/app/(dashboard)/insights/page.tsx`
   - Location search component
   - Pollution display cards
   - Charts

3. **Map Integration** (4-5 days)
   - Map component: `frontend/components/map/pollution-map.tsx`
   - Use Leaflet (already installed)
   - Add markers and popups

4. **Simulation** (4-5 days)
   - Main page: `frontend/app/(dashboard)/simulation/page.tsx`
   - Interactive tree placement
   - Results visualization

5. **Research** (2-3 days)
   - Main page: `frontend/app/(dashboard)/research/page.tsx`
   - Data visualization
   - Export features

6. **Profile** (2-3 days)
   - Main page: `frontend/app/(dashboard)/profile/page.tsx`
   - Settings
   - User preferences

**Total Time:** 3-4 weeks of focused work

---

## 💡 Development Tips

1. **Always test API first** in Swagger UI
2. **Use console.log()** to debug
3. **Check browser console** (F12) for errors
4. **Commit after each working feature**
5. **Test on different screen sizes**
6. **Keep code clean and commented**

---

## 🎓 Key Formulas

### Pollution Index
```
PI = min((0.3 × Temperature) + (0.4 × PM2.5) + (1.2 × CO) - (0.8 × Altitude))
```

### Bio-Urban Trees Calculation
```
Trees Needed = (Pollution Index × Area) / 100
One bio-urban tree = 10 regular trees (10x more oxygen)
```

### AQI from PM2.5
```
If PM2.5 ≤ 12: AQI = PM2.5 × 4.17
If PM2.5 ≤ 35.4: AQI = ((PM2.5 - 12.1) / 23.3) × 49 + 51
... (see backend code for full formula)
```

---

## 🚀 Deployment Commands (When Ready)

### Frontend (Vercel)
```bash
npm run build
# Then push to GitHub, connect Vercel
```

### Backend (Railway/Render)
```bash
# Push to GitHub
# Connect Railway/Render to repository
# Set environment variables
# Deploy!
```

---

## 📞 Getting Help

1. Check relevant documentation file
2. Look at error message carefully
3. Check if servers are running
4. Verify database is running
5. Check browser console
6. Try restarting everything

---

## 🎉 Success Indicators

You know it's working when:
✅ No red errors in terminals  
✅ Can see Veridian homepage  
✅ API docs load properly  
✅ Test endpoints return data  
✅ Database connects successfully  

---

**Print this page for quick reference! 📄**

**Happy Coding! 🌱**
