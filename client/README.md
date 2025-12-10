# Client (React + Vite)

Development:

```powershell
cd client; npm install
npm run dev
```

Environment:
- Copy `.env.example` to `.env` and set `VITE_API_URL` to the server API base URL.

Environment:
- Copy `.env.example` to `.env` and set `VITE_API_URL` to the server API base URL.

Auth flow:
- The app stores JWT in `localStorage` under `pm_token` and user info under `pm_user`.
- API requests attach the token automatically via an Axios interceptor in `src/api.js`.

Build & Deploy:
- `npm run build` produces a `dist/` folder which can be served or deployed to Netlify.

Pages:
- `/login` - Login page
- `/register` - Registration page
- `/` - Projects dashboard (requires login)
