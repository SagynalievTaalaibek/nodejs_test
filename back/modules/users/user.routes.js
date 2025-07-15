const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller');
const auth = require('../../middleware/auth');
const permit = require('../../middleware/permit');

router.get('/', auth, permit('admin'), userController.getUsers);

router.get('/:id', auth, permit('admin'), userController.getUser);

router.post('/', auth, permit('admin'), userController.addUser);

router.put('/:id', auth, permit('admin'), userController.editUser);

router.delete('/:id', auth, permit('admin'), userController.removeUser);

module.exports = router;
