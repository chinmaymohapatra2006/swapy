const User = require('../models/User');

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
};