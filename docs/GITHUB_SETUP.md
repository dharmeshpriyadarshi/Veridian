# 🚀 Connecting Veridian to GitHub

Follow these steps to push your Veridian project to GitHub.

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/dharmeshpriyadarshi)
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository: **veridian**
5. Add description: "Pollution Analysis & Prediction Platform with Bio-Urban Tree Simulation"
6. Choose **Public** (or Private if you prefer)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **"Create repository"**

## Step 2: Connect Your Local Repository

Open your terminal in the Veridian project folder and run:

```bash
# Navigate to project directory (if not already there)
cd "c:\Users\dharm\Desktop\Veridian M"

# Add GitHub remote
git remote add origin https://github.com/dharmeshpriyadarshi/veridian.git

# Verify remote
git remote -v
```

## Step 3: Push to GitHub

```bash
# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

If prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your GitHub password)

### Creating a Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Veridian Project"
4. Expiration: Choose duration (recommend 90 days)
5. Select scopes: `repo` (full control of private repositories)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

## Step 4: Verify Upload

Visit: https://github.com/dharmeshpriyadarshi/veridian

You should see all your files uploaded!

## Step 5: Set Up Repository Details (Optional)

### Add Topics
In your GitHub repository:
1. Click "⚙️ Settings"
2. Under "Topics", add: `pollution`, `ml`, `nextjs`, `fastapi`, `environment`, `bio-urban-trees`, `prediction`

### Add Repository Description
Edit the description at the top:
```
🌱 Veridian - Advanced pollution analysis, ML-powered predictions, and bio-urban tree simulation platform
```

### Pin Important Files
GitHub automatically displays README.md, but make sure it looks good!

## Future Updates

### Making Changes and Pushing

```bash
# Stage your changes
git add .

# Or stage specific files
git add frontend/app/page.tsx

# Commit with a message
git commit -m "feat: Add map visualization component"

# Push to GitHub
git push origin main
```

### Common Git Commands

```bash
# Check status
git status

# View changes
git diff

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Pull latest changes
git pull origin main
```

### Branching Strategy (Recommended)

```bash
# For new features
git checkout -b feature/add-map-visualization

# For bug fixes
git checkout -b fix/aqi-calculation

# For documentation
git checkout -b docs/update-api-docs

# After finishing, merge to main
git checkout main
git merge feature/add-map-visualization
git push origin main
```

## Setting Up GitHub Actions (CI/CD) - Optional

Create `.github/workflows/ci.yml` for automatic testing:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Run tests
        run: cd frontend && npm test

  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: cd backend && pip install -r requirements.txt
      - name: Run tests
        run: cd backend && pytest
```

## Protecting Your Repository

### Never Commit Secrets!

Make sure `.gitignore` includes:
```
.env
.env.local
.env.*.local
```

If you accidentally committed secrets:

```bash
# Remove from Git history
git rm --cached .env

# Commit the removal
git commit -m "Remove .env file"

# Push changes
git push origin main

# IMPORTANT: Immediately regenerate all API keys and secrets!
```

## Collaborating with Others

### Inviting Collaborators

1. Go to repository Settings → Collaborators
2. Click "Add people"
3. Enter GitHub username
4. Choose permission level (Write recommended for team members)

### Accepting Pull Requests

1. Review the changes in the PR
2. Test locally if needed:
   ```bash
   git fetch origin pull/ID/head:BRANCH_NAME
   git checkout BRANCH_NAME
   ```
3. If approved, click "Merge pull request"

## Deployment

### Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Environment Variables: Add from `.env.example`
4. Deploy!

### Backend (Railway/Render)

1. Go to [railway.app](https://railway.app) or [render.com](https://render.com)
2. Connect GitHub repository
3. Configure:
   - Root Directory: `backend`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables: Add from `.env.example`
4. Deploy!

## Repository Insights

Track your project's progress:
- **Commits**: View commit history
- **Contributors**: See who contributed
- **Traffic**: View visitors and clones
- **Issues**: Track bugs and features
- **Pull Requests**: Manage code reviews

## Keeping Your Repo Active

```bash
# Regular commits show active development
git add .
git commit -m "docs: Update README with latest features"
git push origin main
```

## Need Help?

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - for when things go wrong

---

**Your project is now on GitHub! Share it with the world! 🌍**

Repository URL: https://github.com/dharmeshpriyadarshi/veridian
