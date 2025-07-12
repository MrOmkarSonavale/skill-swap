const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be at least 6 characters long']
	}, // hashed
	location: String,
	profilePhoto: String, // 🔥 This is the photo field (can be URL from Cloudinary or placeholder)
	skillsOffered: [String],
	skillsWanted: [String],
	availability: String, // e.g. "Weekends", "Evenings"
	isPublic: { type: Boolean, default: true },
	isAdmin: { type: Boolean, default: false },
	isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);