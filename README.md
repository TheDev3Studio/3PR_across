# 3Pr across - Fullstack Product Catalog Website

3Pr across is a fullstack catalog + inquiry platform for cement and construction tools.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Data: JSON file storage for prototype (`server/data/db.json`)
- Auth: JWT based admin login

## Implemented Features

- Homepage with hero banner, category cards, featured products, testimonials, trust-focused UI
- Floating live visitor counter badge (`people viewing now`)
- Floating WhatsApp quick inquiry button and quick inquiry CTA
- Catalog page with category filters + search + responsive product grid
- Product detail page with specs, related products, and pre-filled inquiry action
- Inquiry/contact page with full form, WhatsApp quick link, call now button, map placeholder
- Admin login + protected dashboard route
- Admin dashboard stats: live visitors, visitors today, total inquiries, total products
- Admin dashboard inquiry listing
- Admin dashboard add-product form for scalable catalog growth
- SEO foundations: meta tags, OG tags, semantic headings
- Responsive layout (mobile-first) and subtle reveal animations
- Scalable mock catalog: 160 products seeded (with image URLs)

## Project Structure

- `client` - frontend app
- `server` - backend API

## Local Setup

### 1. Backend

```powershell
cd server
copy .env.example .env
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`

### 2. Frontend

Open a second terminal:

```powershell
cd client
copy .env.example .env
npm install
npm run dev -- --host
```

Frontend runs on: `http://localhost:5173`

## Default Admin Credentials

- Username: `admin`
- Password: `3Pr across123`

Change credentials in `server/.env` before production use.

## API Endpoints (Core)

- `GET /api/products`
- `GET /api/products/featured`
- `GET /api/products/:id`
- `POST /api/inquiries`
- `POST /api/visitors/ping`
- `GET /api/visitors/live`
- `POST /api/auth/login`
- `GET /api/stats/admin` (protected)
- `GET /api/inquiries/admin` (protected)
- `POST /api/products/admin` (protected)

## Production Notes

- Replace JSON storage with PostgreSQL/MySQL for real production scale
- Move image URLs to a managed media solution (Cloudinary/S3/Azure Blob)
- Set strong JWT secret and admin password via secure environment variables
- Configure reverse proxy, HTTPS, and monitoring before going live
