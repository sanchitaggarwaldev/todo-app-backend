# Todo App Backend (Node.js + Express + MongoDB)

A simple and secure backend for a Todo App, built with **Node.js**, **Express**, and **MongoDB**.  
Includes user authentication with **JWT** and password hashing using **bcrypt**.

## Features
- User Registration & Login (JWT authentication)
- MongoDB database connection (Mongoose)
- Secure password hashing
- RESTful API endpoints
- Ready for integration with a frontend (React/Next.js)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcrypt
- **Tools:** Nodemon, dotenv

## API Endpoints
### Auth Routes
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login and get JWT

### Example Request (Register)
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456"
}
