# 🚗 vehicle_management_system

A backend API for managing vehicles, users, and bookings with full authentication and role-based access control.

---

## 🌍 Live URL:https://vehicle-rental-system-backend-seven.vercel.app/

## Features

- JWT Authentication (Admin & Customer)
- Vehicle management (add, update, delete, list)
- User management (admin control + customer self-update)
- Booking system with price calculation
- Vehicle availability tracking
- Modular folder structure

## 🛠️ Technology Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL
- bcrypt
- jsonwebtoken
- pg

---

## 📁 Project Structure

src/
├── modules/
│ ├── auth
│ ├── users
│ ├── vehicles
│ └── bookings
├── middlewares

├── config
└── app.ts

## ⚙️ Setup Instructions

### 1️⃣ Clone & Install

```bash
git clone https://github.com/asifalam515/vehicle_rental_system_backend
cd vehicle_management_system
npm install
2️⃣ Environment Variables
Create a .env file:

put

PORT=5000
DATABASE_URL=DB_URL
JWT_SECRET=your_jwt_secret
BCRYPT_SALT=salt
3️⃣ Run the Server
bash

npm run dev
```
