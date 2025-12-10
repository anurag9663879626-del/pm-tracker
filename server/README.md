# Server (Express + MySQL)

Development:

```powershell
cd server; npm install
npm run dev
```

Environment:
- Copy `.env.example` to `.env` and set `JWT_SECRET` and MySQL credentials.

Notes:
- DB pool is initialized in `src/config/db.js`.
- Add auth and projects routes under `src/routes/` (next steps).
 
Database initialization:

- A starter SQL file is available at `server/sql/init.sql` to create `users` and `projects` tables.
	Run it against your MySQL instance (e.g., via the `mysql` CLI or a GUI client) before using the app.

Example (MySQL CLI):
```powershell
mysql -h <host> -P <port> -u <user> -p <database> < server/sql/init.sql
```
