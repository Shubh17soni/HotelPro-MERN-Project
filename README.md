# HotelPro — Hotel Booking & Management System

MERN capstone starter implementation aligned with the SkillWallet PDF:
- React + Vite frontend (`http://localhost:5173`)
- Express backend (`http://localhost:8001`)
- MongoDB + Mongoose
- JWT authentication, bcrypt password hashing, role-based access
- Room browsing, booking, booking history/cancellation
- Admin dashboard: bookings, rooms, users, add room
- Responsive Bootstrap-inspired custom UI

## Requirements
Node.js 18+ (Node 16+ may work), npm, MongoDB Community or MongoDB Atlas.

## 1. Configure backend
```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```
Edit `server/.env` and set `MONGO_URI` and a long `JWT_SECRET`.
The seed command creates an admin account and sample rooms:
- Admin: `admin@hotelpro.com`
- Password: `Admin@12345`

## 2. Configure frontend (new terminal)
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## Demo flow
1. Register an ordinary user.
2. Browse rooms and open a room card.
3. Book a room with check-in/check-out dates.
4. Open My Bookings and cancel an active booking.
5. Sign in as admin using the seeded credentials.
6. Open Admin Dashboard, add a room, and inspect bookings/users.

## Notes
- Payment is represented as a demo payment status; no real card details or gateway charges are collected.
- For a real deployment, use MongoDB Atlas, HTTPS, a strong secret, input-rate limiting, email verification and a real payment gateway.
- Change the seeded admin password before deployment.
