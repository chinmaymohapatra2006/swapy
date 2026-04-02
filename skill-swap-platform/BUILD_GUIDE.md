# HM36 Skill Swap Platform - Detailed Build Guide

## Complete Setup Instructions

### Step 1: Verify Prerequisites

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed
mongod --version
```

### Step 2: Project Setup

The project structure is already created. Navigate to the project directory:
```bash
cd "Skill swap parter project\skill-swap-platform"
```

### Step 3: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

This installs:
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin requests
- dotenv: Environment variables

**Frontend:**
```bash
cd ../client
npm install
```

This installs:
- react & react-dom: UI library
- react-router-dom: Routing
- axios: HTTP client
- react-scripts: Build tools

### Step 4: Configure Environment

1. Navigate to server folder
2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=change_this_to_a_random_secret_string
PORT=5000
NODE_ENV=development
```

### Step 5: Start MongoDB

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud):
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Step 6: Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Browser opens at http://localhost:3000

### Step 7: Test the Application

1. **Sign Up:**
   - Click "Sign up"
   - Enter name, email, password
   - Click "Sign Up"

2. **Create Profile:**
   - Add your bio
   - Add skills you can offer (press Enter after each)
   - Add skills you want to learn
   - Click "Save Changes"

3. **Find Matches:**
   - Navigate to "Matches"
   - See users with complementary skills
   - View their profiles

4. **Send Swap Request:**
   - Click "Request Swap" on a match
   - Write a message
   - Send request

5. **Manage Requests:**
   - Go to "Requests" page
   - Accept/decline incoming requests

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running with `mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in .env or kill process using port

### CORS Error
**Solution:** Backend is running on port 5000 and proxy is configured in client/package.json

### Cannot Find Module
**Solution:** Run `npm install` in both server and client folders

## Production Deployment

### Backend (Heroku)
```bash
cd server
heroku create your-app-name
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

## Success Criteria

✅ Backend API running on port 5000  
✅ Frontend running on port 3000  
✅ Can sign up and login  
✅ Can create and edit profile  
✅ Can see matches  
✅ Can send and receive swap requests  

---
Congratulations! Your HM36 Skill Swap Platform is now running! 🎉
