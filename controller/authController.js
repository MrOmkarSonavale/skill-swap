// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Register User
exports.register = async (req, res) => {
	const { name, email, password } = req.body;

	// Basic validation
	if (!name || !email || !password) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ error: 'Email already in use' });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword
		});

		res.status(201).json({
			message: 'User registered successfully',
			user: {
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email
			}
		});
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
};

// 🔓 Login User
exports.login = async (req, res) => {
	const { email, password } = req.body;

	// Basic validation
	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password required' });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: 'Invalid credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d'
		});

		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email
			}
		});
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
};
