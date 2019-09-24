const express = require('express');
const authenticationController = require('../controllers/authenticationController.js');

const router = express.Router();
router
	.get('/login', authenticationController.login)
	.post('/login',authenticationController.validateLogin)
	.get('/register', authenticationController.register)
	.post('/register', authenticationController.validateRegister)
	.get('/logout', authenticationController.logout);

module.exports = router;