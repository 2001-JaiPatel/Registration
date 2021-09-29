const express = require('express');

const router = express.Router();
const loginController = require('../controllers/login.controller');

router.get('/getLogin', (req, res) => {
    res.render('login');
});

router.post('/login', loginController.login);

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;
