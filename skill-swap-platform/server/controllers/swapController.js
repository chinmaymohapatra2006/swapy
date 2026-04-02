const SwapRequest = require('../models/SwapRequest');
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
};