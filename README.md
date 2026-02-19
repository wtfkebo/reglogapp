# Secure Authentication System

A production-grade authentication system built with Next.js 14, Tailwind CSS, Prisma, and JWT auth.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion (Glassmorphism)
- **Database**: Aiven MySQL (Prisma ORM)
- **Auth**: Custom JWT (jose), Bcrypt hashing

## Features

- Secure Registration & Login
- Password Hashing (bcrypt)
- JWT Authentication (HTTP-only cookies)
- Protected Routes (Middleware)
- Premium Glassmorphism UI
- Form Validation (Zod + React Hook Form)

## Setup Instructions

1.  **Clone the repository** & install dependencies:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Copy `.env.example` to `.env` and fill in your credentials:
    ```bash
    cp .env.example .env
    ```
    
    Required variables:
    - `DATABASE_URL`: Connection string for MySQL
    - `JWT_SECRET`: A strong secret key for token signing

3.  **Database Migration**:
    Push the schema to your database:
    ```bash
    npx prisma db push
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Project Structure

- `app/api/auth`: Backend API routes (register, login, logout, me)
- `components/ui`: Reusable UI components (GlassCard, Button, Input)
- `lib/auth.ts`: Authentication utilities (hash, verify, JWT)
- `lib/db.ts`: Database client (Prisma)
- `middleware.ts`: Route protection logic

## Verification

- Visit `/register` to create an account.
- Visit `/login` to sign in.
- Access `/dashboard` to see protected content.
