// controllers/swapController.js

const SwapRequest = require('../models/swap');

// 📤 Send swap request
exports.sendSwapRequest = async (req, res) => {
	try {
		const swap = await SwapRequest.create(req.body);
		res.status(201).json(swap);
	} catch (err) {
		res.status(500).json({ error: 'Failed to create swap request' });
	}
};

// 📥 Get all swap requests for a user
exports.getUserSwaps = async (req, res) => {
	try {
		const userId = req.params.userId;
		const swaps = await SwapRequest.find({
			$or: [{ fromUser: userId }, { toUser: userId }]
		})
			.populate('fromUser', 'name email')
			.populate('toUser', 'name email')
			.sort({ createdAt: -1 });

		res.json(swaps);
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch swaps' });
	}
};

// ✅ Update swap status (accept/reject/cancel)
exports.updateSwapStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const swap = await SwapRequest.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true }
		);

		if (!swap) return res.status(404).json({ error: 'Swap request not found' });

		res.json(swap);
	} catch (err) {
		res.status(500).json({ error: 'Failed to update swap status' });
	}
};

// ❌ Delete pending swap request
exports.deleteSwap = async (req, res) => {
	try {
		const swap = await SwapRequest.findById(req.params.id);

		if (!swap) return res.status(404).json({ error: 'Swap not found' });
		if (swap.status !== 'pending') {
			return res.status(400).json({ error: 'Only pending swaps can be deleted' });
		}

		await SwapRequest.findByIdAndDelete(req.params.id);
		res.json({ message: 'Swap request deleted' });
	} catch (err) {
		res.status(500).json({ error: 'Failed to delete swap request' });
	}
};
