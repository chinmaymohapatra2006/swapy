"""
HM36 Skill Swap Platform - CSS Styles Builder (Part 4 - FINAL)
"""
import os

BASE = r"C:\Hackethon\Hack matrix\Skill swap parter project\skill-swap-platform"

FILES = {
    # ==================== CSS STYLES ====================
    
    "client/src/styles/index.css": """* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f7fa;
  color: #333;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: #ff4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-state h2 {
  color: #333;
  margin-bottom: 0.5rem;
}""",

    "client/src/styles/App.css": """.App {
  min-height: 100vh;
  background: #f5f7fa;
}""",

    "client/src/styles/Navbar.css": """.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-link:hover {
  background: #f0f0f0;
  color: #4CAF50;
}

.logout-btn {
  color: #ff4444;
}

.logout-btn:hover {
  background: #fff0f0;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
  }
  
  .navbar-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
  }
}""",

    "client/src/styles/AuthPages.css": """.auth-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 450px;
  width: 100%;
}

.auth-card h1 {
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
}

.auth-subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-group small {
  color: #666;
  font-size: 0.85rem;
}

.submit-btn {
  padding: 0.875rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #45a049;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.auth-switch {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.auth-switch a {
  color: #4CAF50;
  font-weight: 600;
  text-decoration: none;
}

.auth-switch a:hover {
  text-decoration: underline;
}""",

    "client/src/styles/ProfilePage.css": """.profile-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.profile-header h1 {
  margin-bottom: 0.25rem;
}

.profile-email {
  color: #666;
}

.edit-btn {
  margin-left: auto;
  padding: 0.5rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #45a049;
}

.profile-section {
  margin-bottom: 2rem;
}

.profile-section h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.profile-section p {
  color: #666;
  line-height: 1.6;
}

.skills-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.skill-tag.offer {
  background: #e8f5e9;
  color: #2e7d32;
}

.skill-tag.want {
  background: #e3f2fd;
  color: #1565c0;
}

.profile-stats {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat strong {
  font-size: 1.5rem;
  color: #4CAF50;
}

.stat span {
  color: #666;
  font-size: 0.9rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-form label {
  font-weight: 500;
  color: #333;
}

.profile-form input,
.profile-form textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.profile-form input:focus,
.profile-form textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.save-btn, .cancel-btn {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn {
  background: #4CAF50;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #45a049;
}

.save-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f0f0f0;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}""",

    "client/src/styles/SkillInput.css": """.skill-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-label {
  font-weight: 500;
  color: #333;
}

.skill-input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.skill-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.skill-hint {
  color: #666;
  font-size: 0.85rem;
  margin-top: -0.5rem;
}

.remove-skill {
  background: none;
  border: none;
  color: #666;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.25rem;
  transition: color 0.2s;
}

.remove-skill:hover {
  color: #ff4444;
}""",

    "client/src/styles/MatchesPage.css": """.matches-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.matches-header {
  text-align: center;
  margin-bottom: 3rem;
}

.matches-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.matches-header p {
  color: #666;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .matches-grid {
    grid-template-columns: 1fr;
  }
}""",

    "client/src/styles/MatchCard.css": """.match-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.match-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.match-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin-bottom: 0.25rem;
  color: #333;
}

.user-bio {
  color: #666;
  font-size: 0.9rem;
}

.match-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #e8f5e9;
  border-radius: 8px;
}

.match-score .score {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e7d32;
}

.match-score small {
  color: #4CAF50;
  font-size: 0.75rem;
}

.match-skills {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skill-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-section strong {
  color: #333;
  font-size: 0.9rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

.skill-badge.offer {
  background: #e8f5e9;
  color: #2e7d32;
}

.skill-badge.want {
  background: #e3f2fd;
  color: #1565c0;
}

.request-btn {
  width: 100%;
  padding: 0.875rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.request-btn:hover {
  background: #45a049;
}

.request-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-form textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
}

.request-form textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
}

.send-btn, .cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn {
  background: #4CAF50;
  color: white;
}

.send-btn:hover:not(:disabled) {
  background: #45a049;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f0f0f0;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}""",

    "client/src/styles/SwapRequestsPage.css": """.requests-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.requests-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e0e0e0;
}

.tab {
  padding: 1rem 2rem;
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.tab:hover {
  color: #333;
}

.tab.active {
  color: #4CAF50;
  border-bottom-color: #4CAF50;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}""",

    "client/src/styles/RequestCard.css": """.request-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.request-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.status-badge {
  margin-left: auto;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.pending {
  background: #fff3e0;
  color: #e65100;
}

.status-badge.accepted {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.declined {
  background: #ffebee;
  color: #c62828;
}

.status-badge.completed {
  background: #e3f2fd;
  color: #1565c0;
}

.request-message {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.request-message strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.request-message p {
  color: #666;
  line-height: 1.5;
}

.request-skills {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.request-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.accept-btn, .decline-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.accept-btn {
  background: #4CAF50;
  color: white;
}

.accept-btn:hover:not(:disabled) {
  background: #45a049;
}

.decline-btn {
  background: #f0f0f0;
  color: #333;
}

.decline-btn:hover {
  background: #ffebee;
  color: #c62828;
}

.accept-btn:disabled, .decline-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.request-date {
  display: block;
  margin-top: 1rem;
  color: #999;
  font-size: 0.85rem;
}""",

    # README and Build Guide
    "README.md": """# HM36 Skill Swap Platform

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
""",

    "BUILD_GUIDE.md": """# HM36 Skill Swap Platform - Detailed Build Guide

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
cd "Skill swap parter project\\skill-swap-platform"
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
""",
}

def create_file(filepath, content):
    full_path = os.path.join(BASE, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ {filepath}")

def main():
    print("=" * 70)
    print("  CREATING CSS STYLES & DOCUMENTATION (PART 4 - FINAL)")
    print("=" * 70)
    print(f"\nTotal files to create: {len(FILES)}\n")
    
    try:
        for filepath, content in FILES.items():
            create_file(filepath, content)
        
        print("\n" + "=" * 70)
        print("✅ ALL FILES CREATED SUCCESSFULLY!")
        print("=" * 70)
        print("\n🎉 HM36 SKILL SWAP PLATFORM BUILD COMPLETE!")
        print("\nNext steps:")
        print("1. cd server && npm install")
        print("2. cd ../client && npm install")
        print("3. Configure .env file in server folder")
        print("4. Start MongoDB")
        print("5. Run both server and client")
        print("\nSee BUILD_GUIDE.md for detailed instructions!")
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
