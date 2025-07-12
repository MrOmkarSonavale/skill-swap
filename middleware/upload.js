// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Set storage destination and filename
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Save to /uploads folder
	},
	filename: function (req, file, cb) {
		const uniqueName = Date.now() + '-' + file.originalname;
		cb(null, uniqueName);
	}
});

// Only accept image files
const fileFilter = (req, file, cb) => {
	const ext = path.extname(file.originalname).toLowerCase();
	if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
		cb(null, true);
	} else {
		cb(new Error('Only .jpg, .jpeg, .png allowed'), false);
	}
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
