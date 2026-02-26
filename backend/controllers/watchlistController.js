const User = require('../models/User');

// @desc    Get user's watchlist
// @route   GET /api/watchlist
// @access  Private
const getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching watchlist' });
    }
};

// @desc    Add stock to watchlist
// @route   POST /api/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
    try {
        const { symbol } = req.body;

        if (!symbol) {
            return res.status(400).json({ message: 'Please provide a stock symbol' });
        }

        const user = await User.findById(req.user.id);

        const uppercaseSymbol = symbol.toUpperCase();

        if (user.watchlist.includes(uppercaseSymbol)) {
            return res.status(400).json({ message: 'Stock already in watchlist' });
        }

        user.watchlist.push(uppercaseSymbol);
        await user.save();

        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to watchlist' });
    }
};

// @desc    Remove stock from watchlist
// @route   DELETE /api/watchlist/:symbol
// @access  Private
const removeFromWatchlist = async (req, res) => {
    try {
        const { symbol } = req.params;
        const user = await User.findById(req.user.id);

        const uppercaseSymbol = symbol.toUpperCase();

        user.watchlist = user.watchlist.filter((item) => item !== uppercaseSymbol);
        await user.save();

        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from watchlist' });
    }
};

module.exports = {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
};
