const express = require('express');
const router = express.Router();
const dbUtils = require('../utils/database');
const auth = require('../middleware/auth');
const ObjectId = require('mongodb').ObjectId;

router.get('/profile', auth, async (req, res) => {
  try {
    console.log(req.userId);
  const users = await dbUtils.select('users', { _id: new ObjectId(req.userId) });
    if (!users || users.length === 0) {
      return res.json({ success: false, message: 'User not found.' });
    }
    const user = users[0];
    return res.json({ success: true, data: user });
  } catch (err) {
    console.log('Error fetching profile:', err);
    return res.json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
