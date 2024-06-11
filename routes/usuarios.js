const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getUsers);
router.get('/:uid', userController.getUser);
router.delete('/:uid', userController.deleteUser);

module.exports = router;
