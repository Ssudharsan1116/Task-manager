# TriLink - Full-Stack Referral Tree System

A production-ready referral management system featuring a 3x3 ternary tree structure with an atomic global placement engine.

## Tech Stack
- **Frontend**: React.js (Vite), Axios, Lucide-React, CSS3 (Glassmorphism)
- **Backend**: Java 17, Spring Boot 3.4, Spring Security (JWT), Spring Data JPA
- **Database**: MySQL 8.0
- **Orchestration**: Docker & Docker Compose

## Features
- **Atomic Placement Engine**: Implements the absolute 9-step global sequence (A→A, B→A, C→A, A→B, B→B, C→B, A→C, B→C, C→C).
- **Subtree Visualizer**: Recursive tree rendering with color-coded slots (A=Blue, B=Purple, C=Green).
- **Responsive Design**: Fluid layout adapts from horizontal tree to vertical branch stacking for mobile/tablet.
- **Secure Auth**: JWT-based authentication with Bcrypt password hashing.

## Quick Start (Docker)

1. **Clone the repository** (if applicable).
2. **Ensure Docker is running** on your machine.
3. **Run the application**:
   ```bash
   docker-compose up --build
   ```
4. **Access the platform**:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)

## Local Development (Without Docker)

### Backend
1. Navigate to `/backend`.
2. Configure `application.properties` with your local MySQL credentials.
3. Run: `./mvnw spring-boot:run`

### Frontend
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## API Documentation
- `POST /api/auth/register`: Register with optional `referralUid`.
- `POST /api/auth/login`: Login for JWT token.
- `GET /api/user/profile`: Get current user stats.
- `GET /api/tree/subtree/{uid}`: Get recursive 3x3 tree data.

---
Built by TriLink Architecture Team.
