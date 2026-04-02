const express = require('express');
const router = express.Router();
const { createSwapRequest, getPendingRequests, updateSwapRequestStatus } = require('../controllers/swapController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createSwapRequest);
router.get('/pending', protect, getPendingRequests);
router.put('/:id', protect, updateSwapRequestStatus);

module.exports = router;
