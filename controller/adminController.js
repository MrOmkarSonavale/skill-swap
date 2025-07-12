const User = require('../models/user');
const Swap = require('../models/swap');

exports.banUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		user.isBanned = !user.isBanned;
		await user.save();
		res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully.` });
	} catch (err) {
		res.status(500).json({ message: 'Error banning user' });
	}
};

exports.deleteSwap = async (req, res) => {
	try {
		await Swap.findByIdAndDelete(req.params.id);
		res.json({ message: 'Swap deleted successfully.' });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting swap' });
	}
};

exports.getDashboard = async (req, res) => {
	try {
		const users = await User.find();
		const swaps = await Swap.find();
		res.json({ users, swaps });
	} catch (err) {
		res.status(500).json({ message: 'Error fetching dashboard data' });
	}
};

exports.sendAnnouncement = async (req, res) => {
	const { title, body } = req.body;
	// You can store it in DB or integrate email/notification logic
	res.json({ message: 'Announcement sent (mock)', title, body });
};
