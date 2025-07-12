// controllers/userController.js

const User = require('../models/User');

// GET user by ID (no password)
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
};

// UPDATE user by ID
exports.updateUser = async (req, res) => {
	try {
		const updates = req.body;
		const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
		if (!updatedUser) return res.status(404).json({ error: 'User not found' });
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ error: 'Failed to update user' });
	}
};

// SEARCH users by skill (public only)
exports.searchUsersBySkill = async (req, res) => {
	try {
		const { skill } = req.query;
		const users = await User.find({
			skillsOffered: { $regex: skill, $options: 'i' },
			isPublic: true
		}).select('-password');
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: 'Failed to search users' });
	}
};

// TOGGLE privacy
exports.togglePrivacy = async (req, res) => {
	try {
		const { isPublic } = req.body;
		const updated = await User.findByIdAndUpdate(req.params.id, { isPublic }, { new: true });
		res.json({
			message: `Profile set to ${isPublic ? 'public' : 'private'}`,
			user: updated
		});
	} catch (err) {
		res.status(500).json({ error: 'Failed to update privacy' });
	}
};
