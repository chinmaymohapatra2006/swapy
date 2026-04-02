# HM36 Skill Swap Platform

A full-stack web application for peer-to-peer skill exchange built with the MERN stack.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB installed and running
- npm or yarn

### Installation

1. **Clone or extract the project**

2. **Install server dependencies:**
```bash
cd server
npm install
```

3. **Install client dependencies:**
```bash
cd ../client
npm install
```

4. **Configure environment:**
- Copy `server/.env.example` to `server/.env`
- Update MongoDB URI and JWT secret

5. **Start MongoDB:**
```bash
mongod
```

6. **Run the application:**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

7. **Access the app:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📖 Features

- ✅ User authentication (JWT)
- ✅ Profile management with skill tags
- ✅ Smart matching algorithm
- ✅ Match suggestions feed
- ✅ Swap request workflow
- ✅ Responsive design

## 🏗️ Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT, Bcrypt

## 📝 License

MIT License - Free to use and modify

---
Built with ❤️ for HM36 Open Innovation
