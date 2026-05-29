# WayPortal — Full Stack E-Commerce Project

A full-stack furniture e-commerce portal built with **Next.js 15** (frontend) and **Spring Boot** (backend).

---

## Project Structure

```
wayfair-portal/
├── frontend/          # Next.js 15 + TypeScript + Tailwind CSS
└── backend/           # Spring Boot + Java + Maven
```

---

## Frontend Setup

### Requirements
- Node.js 18+
- npm

### Steps

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:3000`

### Environment Variables
Create a `.env.local` file in the `frontend/` directory:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

---

## Backend Setup

### Requirements
- Java 17+
- Maven 3.8+

### Steps

```bash
cd backend
./mvnw spring-boot:run
```

API runs at: `http://localhost:8080`

### Database
The backend uses H2 in-memory database by default (configured in `application.properties`).
A `DataSeeder` automatically populates sample products on startup.

---

## Authentication Flow

1. **Register** → `/register` — Creates account, redirects to `/login`
2. **Login** → `/login` — Validates credentials, redirects to `/` (Home)
3. **Home** is accessible only after successful login authentication

Auth is handled client-side via localStorage (demo mode). For production, wire up the backend JWT endpoints.

---

## Key Pages

| Route        | Description                |
|--------------|----------------------------|
| `/`          | Home page                  |
| `/login`     | Sign in (required for Home)|
| `/register`  | Create account             |
| `/catalog`   | Product catalog            |
| `/cart`      | Shopping cart              |
| `/orders`    | Order tracking             |
| `/dashboard` | Operations dashboard       |
| `/about`     | About WayPortal            |
| `/contact`   | Contact us                 |

---

## Backend API Endpoints

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/api/products`             | List products (paginated)|
| GET    | `/api/products/{id}`        | Get product by ID       |
| POST   | `/api/products`             | Create product          |
| PUT    | `/api/products/{id}`        | Update product          |
| DELETE | `/api/products/{id}`        | Delete product          |
| GET    | `/api/products/search`      | Search products         |
| GET    | `/api/products/category/{c}`| Filter by category      |
