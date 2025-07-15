const express = require('express');
const router = express.Router();
const authController = require('../auth/auth.controller');
const auth = require('../../middleware/auth');

// Login route
router.post('/', authController.login);

// Logout route
router.delete('/', authController.logout);

// Get current logged-in user info
router.get('/me', auth, authController.me);

module.exports = router;
