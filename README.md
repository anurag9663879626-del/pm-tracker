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
