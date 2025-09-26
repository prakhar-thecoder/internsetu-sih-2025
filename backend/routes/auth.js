const express = require('express');
const router = express.Router();
const dbUtils = require('../utils/database');
const { generateToken } = require('../utils/jwt');

// POST /login
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	console.log('Login attempt:', email);
	if (!email || !password) {
		console.log('Missing email or password');
		return res.json({ success: false, message: 'Email and password required.' });
	}
	try {
		const users = await dbUtils.select('users', { email });
		if (!users || users.length === 0) {
			console.log('User not found:', email);
			return res.json({ success: false, message: 'Invalid credentials.' });
		}
		const user = users[0];
		const match = password === user.password;
		if (!match) {
			console.log('Password mismatch for:', email);
			return res.json({ success: false, message: 'Invalid credentials.' });
		}
		const token = generateToken({ userId: user._id });
		console.log('Login successful for:', email);
		return res.json({ success: true, data: { token } });
	} catch (err) {
		console.log('Login error:', err);
		return res.json({ success: false, message: 'Server error.' });
	}
});

module.exports = router;
