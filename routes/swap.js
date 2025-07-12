// routes/swap.js
const express = require('express');
const router = express.Router();
const swapController = require('../controller/swapController');
const auth = require('../middleware/auth');
// POST: Send swap request
router.post('/', auth, swapController.sendSwapRequest);

// GET: All swaps related to a user
router.get('/:userId', swapController.getUserSwaps);

// PATCH: Update swap status (accept/reject/cancel)
router.patch('/:id', swapController.updateSwapStatus);

// DELETE: Delete a pending swap
router.delete('/:id', swapController.deleteSwap);

module.exports = router;
