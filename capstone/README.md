# Jdocks (React + Vite)

## Overview
This is the React frontend for the Capstone project. It implements a simple shop with Home, Inventory (admin), Cart and Dashboard pages. Auth is simulated with fallback login but will attempt server auth if `/auth/login` exists.

## Features
- 4 main pages (Home, Inventory, Cart, Dashboard), plus Login
- Global state using `useReducer` + Context
- Connects to backend via `VITE_API_BASE_URL`
- Inventory editing (admin) calls `PUT /inventory/:id`
- Inventory listing uses `GET /inventory`
- Cart is local by default; can be extended to call `/cart` endpoints


## Setup

1. Clone or create project, copy the frontend files here.
2. Create `.env` at project root:
