# Project Management Tracker — Setup & Deployment Checklist

## ✅ What's Been Built

### Backend (Node.js + Express + MySQL)
- ✅ Express server with CORS enabled
- ✅ JWT-based authentication (register/login)
- ✅ User model with bcrypt password hashing
- ✅ Projects CRUD API with authorization (only own projects)
- ✅ MySQL connection pool (reads env vars)
- ✅ Auth middleware to protect routes
- ✅ SQL schema (users & projects tables with FK)
- ✅ Deployment: Dockerfile, Procfile, railway.json

### Frontend (React + Vite)
- ✅ React Router for navigation (SPA)
- ✅ Auth context & protected routes
- ✅ Login/Register pages with validation
- ✅ Projects dashboard (CRUD UI)
- ✅ Axios API client with JWT interceptor
- ✅ Auto-logout on 401 errors
- ✅ localStorage token storage
- ✅ Responsive styling (CSS)
- ✅ Loading/error states & spinner

### Git & CI/CD
- ✅ 6 semantic git commits (Commit 1–6)
- ✅ GitHub Actions workflows
  - ✅ Netlify frontend deploy (`.github/workflows/deploy-frontend.yml`)
  - ✅ Docker build & GHCR push + Railway deploy (`.github/workflows/backend-ci.yml`)
- ✅ Deployment configs: `netlify.toml`, `Dockerfile`, `Procfile`, `railway.json`

---

## 📋 Pre-Deployment Checklist

### Local Setup
- [ ] Clone/have the repo: `d:\MS_AI_ML\Trimester 2\FSD\CIA4`
- [ ] Git history is in place: `git log --oneline -n 10` shows 7+ commits

### Database Setup
- [ ] MySQL instance running (Clever Cloud or local)
- [ ] Run `server/sql/init.sql` to create `users` and `projects` tables
- [ ] Test connection with credentials from `.env`

### Environment Variables
- [ ] **Client**: `client/.env` copied from `client/.env.example`
  - `VITE_API_URL=http://localhost:5000/api` (for local testing)
  - Or production API URL once deployed
- [ ] **Server**: `server/.env` copied from `server/.env.example`
  - `JWT_SECRET=<your-secret-key>`
  - `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_PORT`
  - `PORT=5000` (or desired port)

### Local Testing
- [ ] Server runs: `cd server && npm install && npm run dev`
  - Should see: `Server running on port 5000`
- [ ] Client runs: `cd client && npm install && npm run dev`
  - Should see: Vite dev server running (typically `http://localhost:5173`)
- [ ] Test auth flow:
  - Register a user via `/register`
  - Login via `/login`
  - Create/update/delete projects on `/` (dashboard)

---

## 🚀 Deployment Checklist

### GitHub Secrets (Required)
Add these via `gh secret set` or GitHub web UI (Settings → Secrets → Actions):

**Netlify (Frontend)**
- [ ] `NETLIFY_AUTH_TOKEN` — personal access token from Netlify
  ```powershell
  gh secret set NETLIFY_AUTH_TOKEN --body "<token>" --repo anurag9663879626-del/pm-tracker
  ```
- [ ] `NETLIFY_SITE_ID` — site ID (e.g., `glittering-cannoli-fd1cba`)
  ```powershell
  gh secret set NETLIFY_SITE_ID --body "<site-id>" --repo anurag9663879626-del/pm-tracker
  ```

**Railway (Backend) — Optional but Recommended**
- [ ] `RAILWAY_API_TOKEN` — Railway API token (for automatic deploys)
  ```powershell
  gh secret set RAILWAY_API_TOKEN --body "<token>" --repo anurag9663879626-del/pm-tracker
  ```

### Verify Secrets
```powershell
gh secret list --repo anurag9663879626-del/pm-tracker
```

### GitHub Actions Workflows
- [ ] Workflows are present in `.github/workflows/`:
  - `deploy-frontend.yml` — builds client, deploys to Netlify
  - `backend-ci.yml` — builds Docker, pushes to GHCR, deploys to Railway
- [ ] Test workflow: push a dummy commit to `main` and check Actions tab
  ```powershell
  cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4"
  echo "# Test" >> TEST.md
  git add TEST.md
  git commit -m "Test CI workflow"
  git push origin main
  ```

### Frontend Deployment (Netlify)
- [ ] Netlify site created or linked
- [ ] Build command: `npm --prefix client run build`
- [ ] Publish directory: `client/dist`
- [ ] Environment variable: `VITE_API_URL=<backend-api-url>`
  - Locally: `http://localhost:5000/api`
  - Production: e.g., `https://pm-tracker-server.railway.app/api`

### Backend Deployment (Railway)
**Option A: Automatic (with RAILWAY_API_TOKEN secret)**
- [ ] `RAILWAY_API_TOKEN` is set in GitHub Secrets
- [ ] Workflows will auto-deploy on each push to `main`

**Option B: Manual (if no RAILWAY_API_TOKEN)**
- [ ] Create a Railway service
- [ ] Connect GitHub repo or use Docker image from GHCR
- [ ] Set environment variables in Railway:
  - `PORT=5000`
  - `JWT_SECRET=<secret>`
  - `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_PORT`

---

## 🔗 Links & Commands

### Local Development
```powershell
# Terminal 1 — Backend
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4\server"
npm run dev

# Terminal 2 — Frontend
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4\client"
npm run dev
```

### Git
```powershell
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4"
git log --oneline -n 10     # View commits
git status                  # Check for uncommitted changes
git push origin main        # Push to GitHub
```

### Database
```powershell
# Example: initialize MySQL (Clever Cloud)
mysql -h <host> -P <port> -u <user> -p <database> < server/sql/init.sql
```

### Repository
- GitHub: https://github.com/anurag9663879626-del/pm-tracker
- Actions: https://github.com/anurag9663879626-del/pm-tracker/actions

---

## ⚠️ Security Notes

1. **Never commit secrets** — use `.env.example` as a template.
2. **Rotate compromised tokens** — if you see a token exposed, generate a new one immediately.
3. **Use GitHub Secrets** for all credentials (Netlify, Railway, JWT secret, DB password).
4. **httpOnly cookies** — for production, consider migrating from `localStorage` to httpOnly cookies for JWT storage (more secure against XSS).
5. **HTTPS** — ensure Netlify and Railway are using HTTPS in production.

---

## 📝 Next Steps

1. **Run locally** to verify the app works end-to-end.
2. **Add GitHub Secrets** (Netlify and Railway tokens).
3. **Push to GitHub** (done; repo is live).
4. **Trigger first deploy** — push a commit or manually run the workflow.
5. **Monitor deployments** — check GitHub Actions and Netlify/Railway dashboards.
6. **Test production** — verify login/register/CRUD work on deployed frontend and backend.

---

## 🎉 You're All Set!

The boilerplate is complete with:
- Modular, reusable code structure
- Full authentication & authorization
- CRUD operations with ownership checks
- Deployment-ready configuration
- Automated CI/CD workflows

Happy building! 🚀
