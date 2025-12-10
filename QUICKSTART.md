# PM Tracker — Quick Start Guide

## ✅ What's Ready

Your full-stack application boilerplate is complete and ready to use:

- **Backend**: Express.js + JWT Auth + MySQL (CRUD API for projects)
- **Frontend**: React + Vite + Axios + React Router (with protected routes)
- **Database**: MySQL tables initialized (`users` and `projects`)
- **Deployment**: Netlify (frontend) + Railway (backend) with GitHub Actions
- **CI/CD**: Automated workflows for building and deploying on each commit

---

## 🚀 Running Locally (5 minutes)

### Prerequisites
- Node.js 18+ installed
- MySQL connection (Clever Cloud or local)
- `.env` files created (see below)

### Step 1: Create `.env` Files

**Server**: `server/.env`
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_me_in_production

MYSQL_HOST=bt2qhmyxo8fm1azbsi3r-mysql.services.clever-cloud.com
MYSQL_DATABASE=bt2qhmyxo8fm1azbsi3r
MYSQL_USER=urjooop333yh9vrz
MYSQL_PASSWORD=A1aD8h4yW74DEwdCnQyE
MYSQL_PORT=3306
```

**Client**: `client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

### Step 2: Initialize Database

Run once to create tables:
```powershell
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4\server"
node scripts/init-db.js
```

Expected output:
```
✅ Connected to MySQL database
✅ users
✅ projects
✅ Database initialized. Tables: projects, users
```

### Step 3: Start the Server

**Terminal 1** (Backend):
```powershell
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4\server"
npm run dev
```

Should see: `Server running on port 5000`

### Step 4: Start the Client

**Terminal 2** (Frontend):
```powershell
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4\client"
npm run dev
```

Should see: Vite dev server running (typically `http://localhost:5173`)

### Step 5: Test the App

1. Open browser: **http://localhost:5173**
2. Click **Register** and create a test account
3. Login and create/edit/delete projects on the dashboard
4. Logout and verify you're redirected to login

### Step 6: Run Integration Tests (Optional)

**Terminal 3**:
```powershell
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4"
node test-local.js
```

Should pass 8/8 tests:
```
✅ Server Health
✅ User Registration
✅ User Login
✅ Create Project
✅ Get Projects
✅ Update Project
✅ Delete Project
✅ Unauthorized Access
```

---

## 🌐 Deploying to Production

### Netlify (Frontend)

1. Create Netlify account & site
2. Get your Site ID from Netlify settings
3. Create Netlify personal access token
4. Add secrets to GitHub repo:
   ```powershell
   gh secret set NETLIFY_SITE_ID --body "<site-id>" --repo anurag9663879626-del/pm-tracker
   gh secret set NETLIFY_AUTH_TOKEN --body "<auth-token>" --repo anurag9663879626-del/pm-tracker
   ```
5. Push to `main` branch → GitHub Actions will auto-deploy

### Railway (Backend)

1. Create Railway account & project
2. Get your Railway API token
3. Add secret to GitHub:
   ```powershell
   gh secret set RAILWAY_API_TOKEN --body "<token>" --repo anurag9663879626-del/pm-tracker
   ```
4. Push to `main` → GitHub Actions will build Docker image & deploy

---

## 📚 Project Structure

```
pm-tracker/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── pages/            # Login, Register, Dashboard
│   │   ├── components/       # ProjectForm, ProjectList
│   │   ├── services/         # API client, auth helpers
│   │   ├── AuthContext.jsx   # Auth state management
│   │   ├── App.jsx           # Router & main app
│   │   └── styles.css        # Global styles
│   ├── package.json
│   ├── .env.example
│   └── netlify.toml          # Netlify config
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/           # Auth, Projects API
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # User, Project queries
│   │   ├── middleware/       # JWT auth
│   │   ├── config/           # DB connection
│   │   └── index.js          # Express app
│   ├── scripts/              # DB initialization
│   ├── sql/                  # init.sql schema
│   ├── Dockerfile            # Container image
│   ├── Procfile              # Railway process
│   ├── package.json
│   ├── .env.example
│   └── railway.json          # Railway config
│
├── .github/workflows/        # CI/CD
│   ├── deploy-frontend.yml   # Netlify deploy
│   └── backend-ci.yml        # Docker & Railway
│
├── test-local.js             # Integration tests
├── SETUP_CHECKLIST.md        # Complete checklist
└── README.md                 # Overview
```

---

## 🔧 Troubleshooting

### Database Connection Failed

**Error**: `Server error` on registration/login

**Solution**: Verify `.env` has correct MySQL credentials:
```powershell
cd server
node scripts/init-db.js
```

### Port 5000 Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```powershell
# Kill existing Node process
Get-Process node | Stop-Process -Force

# Restart
npm run dev
```

### Client Can't Reach API

**Error**: CORS or connection error

**Solution**: Ensure `client/.env` has:
```
VITE_API_URL=http://localhost:5000/api
```

### Tests Fail with "Server not running"

**Solution**: Ensure both server and client are running before tests:
```powershell
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev

# Terminal 3
node test-local.js
```

---

## 📖 API Reference

### Authentication
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user (returns JWT token)

### Projects (Requires `Authorization: Bearer <token>`)
- `GET /api/projects` — List user's projects
- `GET /api/projects/:id` — Get project details
- `POST /api/projects` — Create project
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### Health
- `GET /api/health` — Server health check

---

## 🔐 Security Notes

1. **Never commit secrets**: `.env` files are in `.gitignore`
2. **Use GitHub Secrets** for all credentials
3. **Rotate tokens**: If exposed, generate new ones immediately
4. **Change JWT_SECRET**: Update in production deployment
5. **Use HTTPS**: Netlify & Railway provide free HTTPS

---

## 📞 Next Steps

1. ✅ Run locally (Steps 1-6 above)
2. ✅ Configure GitHub Secrets
3. ✅ Push to GitHub → Workflows auto-run
4. ✅ Monitor deployments in GitHub Actions tab
5. ✅ Test live deployments

---

## 🎉 You're All Set!

Your boilerplate is production-ready and fully modular. Happy coding!

For help: check `SETUP_CHECKLIST.md` or review the code in `server/` and `client/` directories.
