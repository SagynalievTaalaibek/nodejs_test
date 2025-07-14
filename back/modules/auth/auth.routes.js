const express = require('express');
const router = express.Router();
const authController = require('../auth/auth.controller');

router.post('/', authController.login);
router.delete('/', authController.logout);

module.exports = router;
