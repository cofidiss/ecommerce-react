# E-Commerce React Frontend

A modern e-commerce frontend built with React, TypeScript, and Vite.

This project provides a complete client-side experience for:

- user authentication (login and signup)
- product browsing and filtering
- basket management
- order creation and order history
- real-time order notifications over WebSocket

It is designed to work with a backend API (REST + STOMP WebSocket).

## Features

- Authentication
  - Login and signup screens
  - Role-aware behavior (admin vs. standard user)
- Product flow
  - Product filtering by name, category, and price range
  - Product table with sorting and pagination
  - Add-to-basket action
- Basket flow
  - View current basket items
  - Remove items
  - Create order from basket
- Order flow
  - Admin: filter all orders by user and amount
  - Standard user: view own orders
  - View order details in modal dialog
- Global UX utilities
  - Central loading backdrop
  - Reusable modal system for feedback and detail views
  - Top navigation integrated with auth state
- Real-time updates
  - STOMP over WebSocket connection
  - Subscribes to order creation events and shows notifications

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI (MUI) + Emotion
- React Router
- STOMP.js (WebSocket messaging)
- Day.js and MUI Date Pickers
- ESLint
- Docker + Nginx (production image)

## Project Structure

```text
src/
  components/
    Basket/
    FilterProduct/
    FilterProductBox/
    FilteredProductList/
    Login/
    Navbar/
    Order/
    SignUp/
    Welcome/
  Contexts/
  Models/
  Providers/
  services/
  styles/
  Utils/
```

## Prerequisites

- Node.js 20+ (recommended)
- npm 9+
- Docker (optional, for containerized run)

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_APP_BASE_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080
```

Notes:

- `VITE_APP_BASE_URL` is used across most components/services.
- `VITE_API_BASE_URL` is used in the app provider auth check.
- In a typical setup, both point to the same backend base URL.

## Getting Started (Local)

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:5173
```

## Available Scripts

- `npm run dev`: Run Vite dev server
- `npm run build`: Type-check and create production build
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:5173
```

The container serves the production build using Nginx.

## Backend Expectations

The frontend expects these backend capabilities:

- REST endpoints for user, product, basket, and order operations
- Session/auth handling for login state checks
- WebSocket endpoint at `/ws`
- STOMP topic subscription at `/topic/orderCreated`

## Roadmap Ideas

- Add unit/integration tests (Vitest + React Testing Library)
- Improve API error handling consistency
- Add i18n support
- Add CI workflow for lint/build checks

## License

No license file is currently included in this repository.
Add a `LICENSE` file if you plan to publish this project publicly.
