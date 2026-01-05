# 🎯 SIMPLE SETUP - Step by Step

## ✅ What You Need (One-Time Setup)

### 1️⃣ Install Software (15-20 minutes)

**Install these 3 things:**

1. **Node.js** (JavaScript runtime)
   - Go to: https://nodejs.org/
   - Download: LTS version (green button)
   - Install: Just click Next, Next, Finish
   - ✅ Check: Open PowerShell, type: `node --version`

2. **Python** (Programming language)
   - Go to: https://www.python.org/downloads/
   - Download: Latest version (yellow button)
   - Install: **CHECK "Add Python to PATH"** ⚠️ IMPORTANT!
   - ✅ Check: Open PowerShell, type: `python --version`

3. **PostgreSQL** (Database)
   - Go to: https://www.postgresql.org/download/windows/
   - Download and install
   - During install: Remember your password! Write it down!
   - ✅ Check: Look for "pgAdmin 4" in Start Menu

### 2️⃣ Setup Database (2 minutes)

1. Open **SQL Shell (psql)** from Start Menu
2. Press **Enter** 5 times (accept defaults)
3. Type your password (won't show while typing - that's normal!)
4. Type: `CREATE DATABASE veridian;`
5. Type: `\q` and press Enter (to quit)

✅ Database created!

---

## 🚀 Setup Veridian (10 minutes)

### Step 1: Backend Setup

Open **PowerShell** (right-click Start → PowerShell):

```powershell
# Go to your project
cd "c:\Users\dharm\Desktop\Veridian M"

# Go to backend
cd backend

# Create virtual environment (takes 1 minute)
python -m venv venv

# Activate it (you'll see (venv) appear)
.\venv\Scripts\activate

# Install packages (takes 3-5 minutes - be patient!)
pip install -r requirements.txt

# Create config file
copy .env.example .env

# Edit config
notepad .env
```

**In Notepad:**
- Find line: `DATABASE_URL=postgresql://postgres:password@localhost:5432/veridian`
- Change `password` to YOUR PostgreSQL password
- Find line: `SECRET_KEY=your-super-secret-key`
- Change it to: `SECRET_KEY=mysecretkey12345678901234567890`
- Save (Ctrl+S) and close

```powershell
# Test backend
uvicorn app.main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

✅ **Backend works!** Press **Ctrl+C** to stop it for now.

### Step 2: Frontend Setup

Open **NEW PowerShell window** (don't close the first one):

```powershell
# Go to project
cd "c:\Users\dharm\Desktop\Veridian M"

# Go to frontend
cd frontend

# Install packages (takes 3-5 minutes)
npm install

# Create config file
copy .env.example .env.local

# Edit config
notepad .env.local
```

**In Notepad:**
- Find: `DATABASE_URL=postgresql://postgres:password@localhost:5432/veridian`
- Change `password` to YOUR PostgreSQL password
- Find: `NEXTAUTH_SECRET=your-secret-key-here`
- Change to: `NEXTAUTH_SECRET=mynextauthsecret123456789012345`
- Save (Ctrl+S) and close

```powershell
# Setup database tables
npx prisma generate
npx prisma db push

# Test frontend
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000
```

✅ **Frontend works!**

---

## 🎮 Using Veridian

### Every Time You Want to Use It:

**Terminal 1 - Backend:**
```powershell
cd "c:\Users\dharm\Desktop\Veridian M\backend"
.\venv\Scripts\activate
uvicorn app.main:app --reload
```
Keep this window open!

**Terminal 2 - Frontend:**
```powershell
cd "c:\Users\dharm\Desktop\Veridian M\frontend"
npm run dev
```
Keep this window open too!

**Your Browser:**
- Open Chrome or Firefox
- Go to: **http://localhost:3000**
- 🎉 See Veridian homepage!

---

## 🗺️ What You Can Do Now

### 1. View the Homepage
- Open: http://localhost:3000
- See beautiful landing page
- Click around navigation

### 2. Test the API
- Open: http://localhost:8000/api/docs
- See all available endpoints
- Try them out:
  1. Click `GET /api/pollution/current`
  2. Click "Try it out"
  3. Type: `New Delhi` in location
  4. Click "Execute"
  5. See pollution data!

### 3. Test Prediction
- In API docs, find `POST /api/prediction/predict`
- Click "Try it out"
- Copy this and paste:
  ```json
  {
    "location": "Mumbai, India",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "predictionDate": "2026-06-15T00:00:00Z"
  }
  ```
- Click "Execute"
- See prediction for June 2026!

### 4. Test Simulation
- Find `POST /api/simulation/simulate`
- Click "Try it out"
- Paste:
  ```json
  {
    "location": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "area": 5.0,
    "currentAQI": 185,
    "currentPI": 87.5
  }
  ```
- Click "Execute"
- See how many trees needed!

---

## 🎨 What to Build Next

The backend is **100% complete**! Now build the frontend pages:

### Week 1: Authentication
- Sign in page
- Sign up page
- Connect to backend API

### Week 2: Insights Page
- Location search
- Show pollution data
- Add charts

### Week 3: Map Integration
- Add Leaflet map
- Show pollution zones
- Interactive markers

### Week 4: Simulation Page
- Place trees on map
- Calculate reduction
- Show results

### Week 5: Research & Profile
- Research portal
- User profile
- Settings

---

## 🐛 Problems?

### "Port 8000 already in use"
```powershell
# Kill the process
netstat -ano | findstr :8000
taskkill /PID <NUMBER> /F
```

### "Database connection failed"
```powershell
# Start PostgreSQL
net start postgresql-x64-14
```

### "Module not found"
```powershell
# Backend:
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt

# Frontend:
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Still stuck?
1. Check [HOW_TO_USE.md](HOW_TO_USE.md) - detailed guide
2. Check if both servers are running
3. Check passwords in .env files
4. Restart your computer (sometimes helps!)

---

## 📊 API Endpoints Quick Reference

| Endpoint | What It Does |
|----------|--------------|
| `GET /api/pollution/current` | Get current pollution data |
| `GET /api/pollution/history` | Get historical data |
| `POST /api/prediction/predict` | Predict future pollution |
| `POST /api/simulation/simulate` | Calculate trees needed |
| `POST /api/auth/signup` | Register new user |
| `POST /api/auth/signin` | Login user |

---

## ✅ Checklist

**Setup (Do Once):**
- [ ] Installed Node.js
- [ ] Installed Python
- [ ] Installed PostgreSQL
- [ ] Created `veridian` database
- [ ] Installed backend packages
- [ ] Created backend .env file
- [ ] Installed frontend packages
- [ ] Created frontend .env.local file
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma db push`

**Every Time:**
- [ ] Start backend (Terminal 1)
- [ ] Start frontend (Terminal 2)
- [ ] Open http://localhost:3000

---

## 🎯 Pro Tips

1. **Keep terminals open** while working
2. **Save your passwords** somewhere safe
3. **Test API first** before building UI
4. **Use Chrome DevTools** (F12) to debug
5. **Check console** for error messages
6. **Commit often** to git

---

## 🎉 You're Ready!

**Everything is working and NO API keys needed!** 

The backend is complete with:
✅ Real-time pollution data  
✅ 2026 predictions  
✅ Bio-urban tree simulation  
✅ All calculations working  

Now just build the beautiful UI pages! 🎨

**Questions?** Read [HOW_TO_USE.md](HOW_TO_USE.md) for detailed explanations.

**Happy Coding! 🌱**
