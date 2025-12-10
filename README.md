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
	- To deploy to Railway, either connect the GitHub repo to Railway or configure Railway to use the GHCR image.

Setting repository secrets (GitHub web UI):
1. Go to your repository -> Settings -> Secrets -> Actions.
2. Add `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`, and (optionally) `RAILWAY_API_TOKEN` if you choose to use Railway's CLI in CI.

Pushing to GitHub (example commands):
```powershell
cd "d:\MS_AI_ML\Trimester 2\FSD\CIA4"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If you want me to push the repo for you, I can prepare the commands but I will not use or store your credentials — you should run the push locally or provide a scoped deploy key/token.
