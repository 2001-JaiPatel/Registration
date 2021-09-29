const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/getAllUser', auth, userController.getAll);
router.get('/user_info/:email', auth, userController.get);
router.delete('/deleteUser', auth, userController.delete);
router.post('/editUser', auth, userController.save);
router.get('/checkForUseExist', userController.check);

module.exports = router;
