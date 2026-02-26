const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', protect, admin, getAllUsers);

module.exports = router;
