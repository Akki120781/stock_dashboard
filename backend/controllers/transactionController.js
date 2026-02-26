const Transaction = require('../models/Transaction');

// @desc    Submit buy/sell request
// @route   POST /api/transactions
// @access  Private
const submitTransaction = async (req, res) => {
    try {
        const { stockSymbol, type, quantity, price } = req.body;

        if (!stockSymbol || !type || !quantity || !price) {
            return res.status(400).json({ message: 'Please provide all transaction fields' });
        }

        const transaction = await Transaction.create({
            userId: req.user.id,
            stockSymbol,
            type,
            quantity,
            price,
            status: 'pending', // Default
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting transaction' });
    }
};

// @desc    Get logged in user's transactions
// @route   GET /api/transactions
// @access  Private
const getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

// @desc    Get all transactions (Admin)
// @route   GET /api/transactions/admin
// @access  Private/Admin
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('userId', 'username email').sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all transactions' });
    }
};

// @desc    Approve or reject a transaction (Admin)
// @route   PUT /api/transactions/:id/status
// @access  Private/Admin
const updateTransactionStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.status = status;
        await transaction.save();

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction status' });
    }
};

module.exports = {
    submitTransaction,
    getUserTransactions,
    getAllTransactions,
    updateTransactionStatus,
};
