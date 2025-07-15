const express = require('express');
const router = express.Router();
const authController = require('../auth/auth.controller');
const auth = require('../../middleware/auth');

router.post('/', authController.login);
router.delete('/', authController.logout);
router.get('/me', auth, authController.me);

module.exports = router;
