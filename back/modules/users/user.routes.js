const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller');

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.addUser);

router.put('/:id', userController.editUser);

router.delete('/:id', userController.removeUser);

module.exports = router;
