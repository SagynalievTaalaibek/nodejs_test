const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller');
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permit');

// Get all users (only for admin)
router.get('/', auth, permit('admin'), userController.getUsers);

// Get user by ID (only for admin)
router.get('/:id', auth, permit('admin'), userController.getUser);

// Create new user (only for admin)
router.post('/', auth, permit('admin'), userController.addUser);

// Update user by ID (only for admin)
router.put('/:id', auth, permit('admin'), userController.editUser);

// Delete user by ID (only for admin)
router.delete('/:id', auth, permit('admin'), userController.removeUser);

module.exports = router;
