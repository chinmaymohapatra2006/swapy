const express = require('express');
const router = express.Router();
const { getAllUsers, searchUsers, getUserProfile, updateUserProfile } = require('../controllers/userController');  

router.get('/', getAllUsers);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/search', searchUsers);

module.exports = router;
