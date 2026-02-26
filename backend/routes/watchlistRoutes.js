const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getWatchlist).post(protect, addToWatchlist);
router.route('/:symbol').delete(protect, removeFromWatchlist);

module.exports = router;
