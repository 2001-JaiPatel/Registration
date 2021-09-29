const express = require('express');

const router = express.Router();
const passwordController = require('../controllers/password.controller');

router.post('/forgotPassword', passwordController.send);

module.exports = router;
