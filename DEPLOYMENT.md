# 🚀 Project Management Tracker - Deployment Guide

## Deployment Status

This project is configured for automatic deployment via GitHub Actions:

### ✅ Frontend - Netlify
- **Live URL**: Will be shown after first deployment
- **Trigger**: Automatic on push to `main` branch
- **Required Secrets**: 
  - `NETLIFY_AUTH_TOKEN`
  - `NETLIFY_SITE_ID`

### ✅ Backend - Railway  
- **Trigger**: Automatic on push to `main` branch
- **Required Secrets**:
  - `RAILWAY_API_TOKEN`

### ✅ Database - Clever Cloud (Already Connected)
- **Host**: bt2qhmyxo8fm1azbsi3r-mysql.services.clever-cloud.com
- **Database**: bt2qhmyxo8fm1azbsi3r
- **Status**: Active with seed data

---

## Quick Start - Get Deployment URLs

### 1. **Frontend (Netlify)**
After first GitHub Actions workflow runs:
1. Go to https://netlify.com
2. Login with your account
3. Your site URL will be visible (e.g., `https://pm-tracker.netlify.app`)

### 2. **Backend (Railway)**
After first GitHub Actions workflow runs:
1. Go to https://railway.app
2. Login with your account  
3. Select your project → View deployment URL

### 3. **Update Frontend API URL**
Once backend is deployed on Railway:
```
Edit: client/.env or netlify.toml
Set VITE_API_URL = https://your-railway-backend.railway.app/api
```

---

## Verify Secrets are Set in GitHub

1. Go to: https://github.com/anurag9663879626-del/pm-tracker
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Verify these secrets exist:
   - ✅ NETLIFY_AUTH_TOKEN
   - ✅ NETLIFY_SITE_ID
   - ✅ RAILWAY_API_TOKEN

If missing, add them now.

---

## Local Testing

### Start Local Dev Servers
```powershell
# Terminal 1 - Backend
cd server
node src/index.js

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Access App
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api

### Test Accounts
- Email: `anurag@example.com` | Password: `password123`
- Email: `john@example.com` | Password: `secure456`
- Email: `sarah@example.com` | Password: `design789`

---

## Deployment Workflow

### Push to GitHub
```powershell
git add -A
git commit -m "your changes"
git push origin main
```

### GitHub Actions Runs Automatically
1. **deploy-frontend.yml**:
   - Builds React app with Vite
   - Deploys to Netlify using CLI
   
2. **backend-ci.yml**:
   - Builds Docker image
   - Pushes to GitHub Container Registry
   - Deploys to Railway

### Monitor Deployments
1. Go to: https://github.com/anurag9663879626-del/pm-tracker/actions
2. View workflow status
3. Check logs for errors

---

## Troubleshooting

### Netlify Deployment Fails
- Verify `NETLIFY_AUTH_TOKEN` is correct
- Check `NETLIFY_SITE_ID` matches your site
- Ensure `client/dist` build succeeds

### Railway Deployment Fails
- Verify `RAILWAY_API_TOKEN` is valid
- Check Docker image builds without errors
- Ensure environment variables are set in Railway:
  - PORT=5000
  - JWT_SECRET=your_secret
  - MYSQL_HOST=...
  - MYSQL_USER=...
  - MYSQL_PASSWORD=...
  - MYSQL_DATABASE=...
  - MYSQL_PORT=3306

### Database Connection Issues
- Verify Clever Cloud MySQL is running
- Test connection: `node scripts/init-db.js`
- Check credentials in `.env`

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                    │
│              (anurag9663879626-del/pm-tracker)          │
└──────────────┬──────────────────────────┬────────────────┘
               │                          │
        On Push to main                On Push to main
               │                          │
        GitHub Actions #1         GitHub Actions #2
      (deploy-frontend.yml)        (backend-ci.yml)
               │                          │
               ▼                          ▼
        ┌──────────────┐          ┌──────────────┐
        │   Vite Build │          │ Docker Build │
        │  (React App) │          │  (Node.js)   │
        └──────┬───────┘          └──────┬───────┘
               │                         │
               ▼                         ▼
        ┌──────────────┐          ┌──────────────┐
        │   Netlify    │          │  Railway     │
        │ CDN & Hosting│          │  Container   │
        └──────┬───────┘          └──────┬───────┘
               │                         │
               ▼                         ▼
    https://pm-tracker.     https://pm-tracker-
    netlify.app              railway.app
               │                         │
               └────────┬────────────────┘
                        │
                        ▼
            ┌───────────────────────────┐
            │  Clever Cloud MySQL       │
            │  (Database - bt2qhm...)   │
            └───────────────────────────┘
```

---

## Environment Variables Reference

### Frontend (.env)
```
VITE_API_URL=https://your-railway-backend-url/api
```

### Backend (.env)
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_me
MYSQL_HOST=bt2qhmyxo8fm1azbsi3r-mysql.services.clever-cloud.com
MYSQL_USER=urjooop333yh9vrz
MYSQL_PASSWORD=A1aD8h4yW74DEwdCnQyE
MYSQL_DATABASE=bt2qhmyxo8fm1azbsi3r
MYSQL_PORT=3306
```

---

## Features Deployed

✅ User Registration & Login (JWT Auth)
✅ Project CRUD Operations
✅ User Project Isolation  
✅ Seed Data (3 test users with projects)
✅ Blue Gradient UI Design
✅ Protected Routes
✅ Database Persistence
✅ Error Handling & Logging

---

## Next Steps

1. **Verify deployments worked**:
   - Open Netlify URL in browser
   - Try logging in with test account
   - Create a new project

2. **Monitor in production**:
   - Check GitHub Actions for any failures
   - Monitor Netlify & Railway dashboards
   - View logs if issues occur

3. **Custom domain** (Optional):
   - Netlify: Add custom domain in settings
   - Railway: Configure subdomain or custom domain

---

**Deployment by:** GitHub Actions CI/CD
**Last Updated:** December 11, 2025
