# SyncBoard

SyncBoard is a static Kanban task board front end where teams organize tasks across To Do, Doing and Done columns — now with a mock-data REST API.

## How to Run

Prerequisites: Node.js 18+ and npm.

**Client (port 5173):**
```bash
cd client
npm install
npm run dev
```

**Server (port 4000):**
```bash
cd server
npm install
npm run dev
```

Open http://localhost:5173 — sign-in at `/`, boards at `/boards`.

**API docs:** Import `server/postman/SyncBoard-A02.postman_collection.json` into Postman, or run `VITE_API_URL=http://localhost:4000` (vite proxy handles `/api`).

## Tech Stack

React 19 + Vite + Express + mock data (no DB yet) · JWT auth (mock users, in-memory) · Zod validation · CORS
