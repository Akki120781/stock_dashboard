const express = require('express');
const router = express.Router();
const {
    submitTransaction,
    getUserTransactions,
    getAllTransactions,
    updateTransactionStatus,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// User routes
router.route('/').post(protect, submitTransaction).get(protect, getUserTransactions);

// Admin routes
router.get('/admin', protect, admin, getAllTransactions);
router.put('/:id/status', protect, admin, updateTransactionStatus);

module.exports = router;
