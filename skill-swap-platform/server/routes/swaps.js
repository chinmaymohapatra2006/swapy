const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, swapController.createSwapRequest);
router.get('/incoming', authMiddleware, swapController.getIncomingRequests);
router.get('/outgoing', authMiddleware, swapController.getOutgoingRequests);
router.put('/:id/accept', authMiddleware, swapController.acceptRequest);
router.put('/:id/decline', authMiddleware, swapController.declineRequest);

module.exports = router;