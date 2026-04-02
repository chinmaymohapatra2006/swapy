const express = require('express');
const router = express.Router();

const MOCK_MESSAGES = [
  { id: 1, text: "Hey! Thanks for accepting my request. I'm really excited to dive into React with you.", sender: 'them', time: '10:00 AM' },
  { id: 2, text: "Hey Alice! Absolutely, I've been struggling a bit with CSS grid and Figma, so a swap sounds perfect.", sender: 'me', time: '10:05 AM' },      
  { id: 3, text: "Awesome. Do you want to do a quick intro call to see where we're both at?", sender: 'them', time: '10:06 AM' }
];

router.get('/', (req, res) => {
  res.json(MOCK_MESSAGES);
});

module.exports = router;