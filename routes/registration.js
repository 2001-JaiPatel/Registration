const express = require('express');

const router = express.Router();
const registrationController = require('../controllers/registration.controller');

router.post('/register', registrationController.registration);

router.get('/getRegister', (req, res) => {
    res.render('register');
});

module.exports = router;
