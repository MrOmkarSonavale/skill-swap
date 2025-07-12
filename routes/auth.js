const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Auth endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;