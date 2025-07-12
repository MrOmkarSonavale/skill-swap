const upload = require('../middleware/upload');
// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
// Route bindings
router.get('/me/:id', userController.getUserById);
router.patch('/me/:id', auth, userController.updateUser);
router.get('/search', userController.searchUsersBySkill);
router.patch('/privacy/:id', userController.togglePrivacy);
router.post('/upload/:id', auth, upload.single('profilePhoto'), userController.uploadProfilePhoto);

module.exports = router;

