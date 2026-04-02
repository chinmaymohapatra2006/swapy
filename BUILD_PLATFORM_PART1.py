"""
HM36 Skill Swap Platform - Complete Setup Script
This script creates the entire project structure and all code files
"""
import os

BASE = r"C:\Hackethon\Hack matrix\Skill swap parter project\skill-swap-platform"

# All files with their content
FILES = {
    # ==================== SERVER FILES ====================
    "server/package.json": """{
  "name": "skill-swap-server",
  "version": "1.0.0",
  "description": "Backend API for HM36 Skill Swap Platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["skill-swap", "api", "mongodb", "express"],
  "author": "HM36",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}""",

    "server/.env.example": """MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development""",

    "server/.gitignore": """node_modules/
.env
.DS_Store
*.log
npm-debug.log*
.vscode/""",

    "server/server.js": """const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const matchRoutes = require('./routes/matches');
const swapRoutes = require('./routes/swaps');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/swaps', swapRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HM36 Skill Swap API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});""",

    "server/models/User.js": """const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  skillsOffered: [{
    type: String,
    trim: true
  }],
  skillsWanted: [{
    type: String,
    trim: true
  }],
  reputation: {
    type: Number,
    default: 0
  },
  completedSwaps: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Don't return password in queries
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);""",

    "server/models/SwapRequest.js": """const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    default: '',
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Prevent duplicate requests
swapRequestSchema.index({ fromUser: 1, toUser: 1, status: 1 });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);""",

    "server/middleware/auth.js": """const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;""",

    "server/controllers/authController.js": """const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Sign up
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        skillsOffered: user.skillsOffered,
        skillsWanted: user.skillsWanted
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};""",

    "server/controllers/userController.js": """const User = require('../models/User');

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, skillsOffered, skillsWanted } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, skillsOffered, skillsWanted },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};

// Get user by ID (public view)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};""",

    "server/controllers/matchController.js": """const User = require('../models/User');

// Get match suggestions for current user
exports.getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    
    if (!currentUser.skillsOffered.length || !currentUser.skillsWanted.length) {
      return res.json([]);
    }

    // Find users where:
    // - Their offered skills match current user's wanted skills
    // - Their wanted skills match current user's offered skills
    const matches = await User.find({
      _id: { $ne: req.userId }, // Exclude current user
      $or: [
        { skillsOffered: { $in: currentUser.skillsWanted } },
        { skillsWanted: { $in: currentUser.skillsOffered } }
      ]
    }).select('-password');

    // Calculate match scores
    const scoredMatches = matches.map(user => {
      let score = 0;
      
      // Count skills they offer that I want
      const theyOfferIWant = user.skillsOffered.filter(skill => 
        currentUser.skillsWanted.includes(skill)
      );
      score += theyOfferIWant.length;

      // Count skills I offer that they want
      const iOfferTheyWant = currentUser.skillsOffered.filter(skill =>
        user.skillsWanted.includes(skill)
      );
      score += iOfferTheyWant.length;

      return {
        user,
        score,
        matchedSkills: {
          theyOffer: theyOfferIWant,
          theyWant: iOfferTheyWant
        }
      };
    });

    // Sort by score (highest first) and filter out zero matches
    const sortedMatches = scoredMatches
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json(sortedMatches);
  } catch (error) {
    console.error('Match error:', error);
    res.status(500).json({ error: 'Error finding matches' });
  }
};""",

    "server/controllers/swapController.js": """const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

// Create swap request
exports.createSwapRequest = async (req, res) => {
  try {
    const { toUserId, message } = req.body;

    // Check if request already exists
    const existing = await SwapRequest.findOne({
      fromUser: req.userId,
      toUser: toUserId,
      status: 'pending'
    });

    if (existing) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    const swapRequest = new SwapRequest({
      fromUser: req.userId,
      toUser: toUserId,
      message
    });

    await swapRequest.save();
    res.status(201).json({ message: 'Swap request sent', swapRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error creating swap request' });
  }
};

// Get incoming swap requests
exports.getIncomingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      toUser: req.userId,
      status: 'pending'
    }).populate('fromUser', '-password').sort('-createdAt');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching requests' });
  }
};

// Get outgoing swap requests
exports.getOutgoingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      fromUser: req.userId
    }).populate('toUser', '-password').sort('-createdAt');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching requests' });
  }
};

// Accept swap request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findOne({
      _id: req.params.id,
      toUser: req.userId,
      status: 'pending'
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = 'accepted';
    await request.save();

    res.json({ message: 'Request accepted', request });
  } catch (error) {
    res.status(500).json({ error: 'Error accepting request' });
  }
};

// Decline swap request
exports.declineRequest = async (req, res) => {
  try {
    const request = await SwapRequest.findOne({
      _id: req.params.id,
      toUser: req.userId,
      status: 'pending'
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = 'declined';
    await request.save();

    res.json({ message: 'Request declined', request });
  } catch (error) {
    res.status(500).json({ error: 'Error declining request' });
  }
};""",

    "server/routes/auth.js": """const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;""",

    "server/routes/users.js": """const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;""",

    "server/routes/matches.js": """const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, matchController.getMatches);

module.exports = router;""",

    "server/routes/swaps.js": """const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, swapController.createSwapRequest);
router.get('/incoming', authMiddleware, swapController.getIncomingRequests);
router.get('/outgoing', authMiddleware, swapController.getOutgoingRequests);
router.put('/:id/accept', authMiddleware, swapController.acceptRequest);
router.put('/:id/decline', authMiddleware, swapController.declineRequest);

module.exports = router;""",

    # ==================== CLIENT FILES ====================
    "client/package.json": """{
  "name": "skill-swap-client",
  "version": "1.0.0",
  "description": "Frontend for HM36 Skill Swap Platform",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "axios": "^1.5.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000"
}""",

    "client/.gitignore": """node_modules/
build/
.DS_Store
.env.local
.env
npm-debug.log*""",

    "client/public/index.html": """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="HM36 Skill Swap Platform - Exchange skills with peers" />
    <title>HM36 Skill Swap</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>""",

    "client/src/index.js": """import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);""",

    "client/src/App.js": """import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import SwapRequestsPage from './pages/SwapRequestsPage';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <MatchesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <SwapRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;""",
}

def create_file(filepath, content):
    """Create a file with given content"""
    full_path = os.path.join(BASE, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ {filepath}")

def main():
    print("=" * 70)
    print("  HM36 SKILL SWAP PLATFORM - COMPLETE BUILD")
    print("=" * 70)
    print(f"\nCreating project at: {BASE}")
    print(f"Total files to create: {len(FILES)}\n")
    
    try:
        for filepath, content in FILES.items():
            create_file(filepath, content)
        
        print("\n" + "=" * 70)
        print("✅ BACKEND FILES CREATED SUCCESSFULLY!")
        print("=" * 70)
        print("\nCreating frontend React components...\n")
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
