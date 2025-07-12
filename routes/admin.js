const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, isAdmin } = require('../middleware/auth');

router.patch('/ban/:id', auth, isAdmin, adminController.banUser);
router.delete('/swap/:id', auth, isAdmin, adminController.deleteSwap);
router.get('/dashboard', auth, isAdmin, adminController.getDashboard);
router.post('/announcement', auth, isAdmin, adminController.sendAnnouncement);

module.exports = router;
