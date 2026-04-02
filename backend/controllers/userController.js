const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const defaultUser = await User.findOne({ name: /chinmay/i }) || await User.findOne();
    const currentUserId = req.user ? req.user._id : defaultUser._id;

    const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { skillsWanted, skillsOffered } = req.query;
    
    const defaultUser = await User.findOne({ name: /chinmay/i }) || await User.findOne();
    const currentUserId = req.user ? req.user._id : defaultUser._id;

    let query = { _id: { $ne: currentUserId } };
    if (skillsWanted) query.skillsOffered = { $in: skillsWanted.split(',') };
    if (skillsOffered) query.skillsWanted = { $in: skillsOffered.split(',') };
    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // For hackathon: If no req.user is set via auth, just return Chinmay
    const defaultUser = await User.findOne({ name: /chinmay/i }) || await User.findOne();
    const userId = req.user ? req.user._id : defaultUser._id;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const defaultUser = await User.findOne({ name: /chinmay/i }) || await User.findOne();
    const userId = req.user ? req.user._id : defaultUser._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.skillsOffered = req.body.skillsOffered || user.skillsOffered;
    user.skillsWanted = req.body.skillsWanted || user.skillsWanted;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
