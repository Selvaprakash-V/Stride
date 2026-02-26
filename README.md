# Stride

Stride is a collaborative coding and interview practice platform for paired problem solving, with live coding, chat, and scoring. This repository contains:

- A Node/Express backend in the `backend/` folder
- A React frontend (Vite) in the `frontend/` folder

Table of contents
-----------------

- [Getting started](#getting-started)
- [Development](#development)
- [Environment variables](#environment-variables)
- [API overview](#api-overview)
- [Project layout](#project-layout)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Acknowledgements](#acknowledgements)

Getting started
---------------

Prerequisites:

- Node.js 18+ and npm
- A running MongoDB instance (local or remote). You may use a hosted MongoDB or a local MongoDB server.

Install dependencies for backend and frontend:

```bash
cd backend
npm ci

cd ../frontend
npm ci
```

Development (run locally)
-------------------------

1. Create a `.env` file in the `backend/` folder with the variables described below under **Environment variables**.

2. Start the backend (development mode):

```bash
cd backend
npm run dev
```

3. Start the frontend (Vite):

```bash
cd frontend
npm run dev
```

By default the frontend expects `VITE_API_URL` to point to the backend (for example `http://localhost:4000`).

Environment variables
---------------------

Place runtime secrets in `backend/.env` (do not commit secrets).

- `DB_URL` — MongoDB connection string (required for production). If not set the app may use an in-memory fallback for local development.
- `PORT` — Backend port (defaults to 4000 if not provided).
- `CLIENT_URL` — Frontend origin used for CORS.
- `CLERK_SECRET_KEY` — Clerk secret key (if using Clerk authentication).
- `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY` — Inngest configuration (optional).
- `STREAM_API_KEY`, `STREAM_API_SECRET` — Stream API credentials for video/chat (optional).

Frontend environment variables (in `.env` or Vite config):

- `VITE_API_URL` — Base URL for backend API (e.g. `http://localhost:4000/api`).
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk publishable key used by the frontend authentication client.

API overview
------------

The backend exposes a small JSON API. Key endpoints include:

- `GET /health` — health check
- `GET /api/problems` — list problems
- `GET /api/problems/search?q=...` — text search for problems
- `GET /api/problems/:id` — get single problem by id
- `POST /api/problems` — create a problem (host-only, authenticated)
- `POST /api/problems/solved` — mark a problem solved for user
- `GET /api/problems/my-solved` — fetch solved problems for current user

- `POST /api/sessions` — create a new session
- `GET /api/sessions/active` — list active sessions
- `GET /api/sessions/:id` — get session details
- `POST /api/sessions/:id/join` — join a session
- `POST /api/sessions/:id/end` — end a session (host-only)

Authentication
--------------

The app uses Clerk for authentication (server uses `@clerk/express` middleware). Protected routes are guarded by `protectRoute` middleware which will auto-create or sync a `User` document in the database from the identity provider on first request.

Project layout
--------------

- `backend/`
	- `src/server.js` — Express app entry
	- `src/models/` — Mongoose models (`User`, `Problem`, `Session`, `SolvedProblem`)
	- `src/controllers/` — Controller functions that implement API behavior
	- `src/routes/` — Express router definitions
	- `src/lib/` — utility modules (`db.js`, `env.js`, `seedProblems.js`, integrations)
	- `src/middleware/` — Express middleware (e.g. `protectRoute`, `errorHandler`)

- `frontend/`
	- `src/main.jsx` — app bootstrap
	- `src/App.jsx` — top level routes
	- `src/pages/` — route pages (Problems, Problem, Dashboard, Session, Profile)
	- `src/components/` — UI components
	- `src/api/` — small client wrappers for API calls (`problemApi`, `sessionApi`, `userApi`)
	- `src/hooks/` — custom hooks

Contributing
------------

We follow Conventional Commits for commit messages. Suggested workflow:

1. Create a feature branch from `main`:

```bash
git checkout -b feat/my-feature
```

2. Make small, focused commits using Conventional Commit types (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`).

3. Open a pull request against `main` and request reviews.

Code style and tooling
----------------------

- ESLint is configured at the repository root; run a lint pass in the frontend with `npm run lint` from the `frontend/` folder.
- The backend uses `nodemon` for development with `npm run dev`.

CI and deployment
-----------------

This repository includes a GitHub Actions workflow that installs dependencies and builds the frontend. Check `.github/workflows/node-ci.yml` for details.

Troubleshooting
---------------

- If the frontend cannot reach the backend, verify `VITE_API_URL` points to the correct server address.
- If MongoDB connection fails, confirm `DB_URL` is valid and accessible from your environment.

Acknowledgements
----------------

This project integrates with several third-party services (Clerk, Stream, Inngest). See the `backend/src/lib/` folder for their integration helpers.

License
-------

This repository does not contain a license file. 