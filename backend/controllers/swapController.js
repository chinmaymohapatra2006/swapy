const SwapRequest = require('../models/SwapRequest');

exports.createSwapRequest = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    const newRequest = await SwapRequest.create({
      senderId,
      receiverId,
      message,
      status: 'pending'
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ receiverId: req.user.id, status: 'pending' })
      .populate('senderId', 'name avatar skillsOffered');
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSwapRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.receiverId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = status;
    const updatedRequest = await request.save();
    
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
