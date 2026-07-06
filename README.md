# StadiumMind AI

> **The AI Command Center for FIFA World Cup 2026**
> Project built for Google's PromptWars Hackathon.

StadiumMind AI optimizes stadium operations and fan experience for the FIFA World Cup 2026. This repository contains the foundation project structure.

## Decoupled Monorepo Structure
- `/frontend` - Vite + React SPA using TypeScript, Tailwind CSS, React Router, Framer Motion, and Lucide React.
- `/backend` - Node + Express server using TypeScript, configured for routing, controllers, services, middleware, and config.
- `/docs` - Architecture diagram, module scopes, and API references.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
Install dependencies in both directories:

1. **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

2. **Backend**:
   ```bash
   cd backend
   npm install
   ```

### Running Locally

To run the full stack concurrently, launch both services:

- **Frontend Development Server**:
  ```bash
  cd frontend
  npm run dev
  ```
  The app will run locally (typically at `http://localhost:5173`).

- **Backend API Server**:
  ```bash
  cd backend
  npm run dev
  ```
  The backend will listen on port `5000` (typically `http://localhost:5000`).

## Key Config Files
- Frontend Tailwind configuration: [tailwind.config.js](file:///v:/promptwars-h2s/frontend/tailwind.config.js)
- Frontend Context State: [AppContext.tsx](file:///v:/promptwars-h2s/frontend/src/context/AppContext.tsx)
- Frontend Router Setup: [App.tsx](file:///v:/promptwars-h2s/frontend/src/App.tsx)
- Backend Express Application: [app.ts](file:///v:/promptwars-h2s/backend/src/app.ts)
- Backend Startup: [server.ts](file:///v:/promptwars-h2s/backend/src/server.ts)
