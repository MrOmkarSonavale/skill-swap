const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	// 1. Get token from header
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	const token = authHeader.split(' ')[1];

	try {
		// 2. Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// 3. Attach user to request
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Token is not valid' });
	}
};

module.exports = authMiddleware;
