# Sales Dashboard

A full-stack sales dashboard application with a Go backend and a React (Vite + TypeScript) frontend.

## Project Structure

```
sales-dashboard/
  backend/    # Go backend API
  frontend/   # React frontend (Vite + TypeScript)
```

## Getting Started

### Prerequisites
- Node.js (v22+ recommended)
- pnpm (or npm/yarn)
- Go (v1.20+ recommended)
- Docker (for containerization)

### Setup

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Start the backend**
   ```sh
   pnpm start:backend
   ```
3. **Start the frontend**
   ```sh
   pnpm dev
   ```

The frontend will be available at [http://localhost:5173](http://localhost:5173) by default. And the backend API will be available at [http://localhost:8080](http://localhost:8080).

## Testing

- **Frontend:**
  ```sh
  cd frontend
  pnpm test
  ```

## Project Scripts

- `pnpm install` — install all dependencies
- `pnpm dev` — start frontend in development mode
- `pnpm start:backend` — start backend server
