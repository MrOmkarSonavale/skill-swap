const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
	fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	skillOffered: String,  // Which skill requester is offering
	skillWanted: String,   // Which skill they want from the other person
	message: String,       // Optional message with the request
	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected'],
		default: 'pending'
	},
	createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Swap', swapSchema);