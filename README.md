# Project Management Tracker (Boilerplate)

Monorepo scaffold with `client/` (React + Vite) and `server/` (Node.js + Express).

Commits planned:
- Commit 1 of 6: Initial project structure
- Commit 2 of 6: Backend Setup & Authentication
- Commit 3 of 6: Projects CRUD API implementation
- Commit 4 of 6: Frontend UI & Authentication Logic
- Commit 5 of 6: Full Projects CRUD integration
- Commit 6 of 6: Deployment config and final boilerplate

This repo is a modular, reusable boilerplate for building React + Express + MySQL applications.

Deployment
 - Frontend: Netlify — `netlify.toml` at project root configures building the `client` and publishing `client/dist`.
 - Backend: Railway — use `server/Procfile` or `server/Dockerfile`. An example `server/railway.json` lists expected environment variables.

Security & secrets
 - Never commit secrets. Use environment variables in your deployment platform (Netlify/Railway/Clever Cloud).
 - The `.env.example` files under `client/` and `server/` show the variables the app expects.

Next steps to deploy:
 - Frontend (Netlify): connect the repo in Netlify, set the build command to `npm --prefix client run build`, and set the publish directory `client/dist`.
 - Backend (Railway): create a new service, set the start command to `npm start` (or use the provided Dockerfile), and configure `JWT_SECRET` and MySQL connection variables.
CI / Deploy via GitHub Actions
- A workflow to build and deploy the frontend to Netlify is available at `.github/workflows/deploy-frontend.yml`.
  - Set these repository secrets in GitHub: `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.

- A workflow to build the backend Docker image and push it to GitHub Container Registry is available at `.github/workflows/backend-ci.yml`.
  - The image will be pushed to `ghcr.io/<your-org-or-username>/pm-tracker-server:latest`.
  - (Optional) To automatically deploy to Railway, set the `RAILWAY_API_TOKEN` secret and the workflow will run `railway up --service pm-tracker-server` after pushing the image.

Setting repository secrets (safe method using GitHub CLI):
```powershell
# Netlify secrets
gh secret set NETLIFY_AUTH_TOKEN --body "<your-new-netlify-token>" --repo anurag9663879626-del/pm-tracker
gh secret set NETLIFY_SITE_ID --body "<your-site-id>" --repo anurag9663879626-del/pm-tracker

# Railway secret (optional, for automatic Railway deploy)
gh secret set RAILWAY_API_TOKEN --body "<your-railway-api-token>" --repo anurag9663879626-del/pm-tracker
```

Alternatively, use GitHub web UI: Settings → Secrets and variables → Actions → New repository secret.

Important: Never paste tokens or secrets in chat or code. Always use `gh secret set` or the web UI to add secrets to GitHub.