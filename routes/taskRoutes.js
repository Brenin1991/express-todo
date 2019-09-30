const express = require('express');
const taskController = require('../controllers/taskController.js');

const router = express.Router();
router
	.get('/AddTask', taskController.addTask)
	.post('/AddTask',taskController.validateTask)
	.get('/ViewTask/:id', taskController.viewTask)
	.get('/Complete/:id', taskController.completeTask)
	//.post('/Complete/:id', taskController.complete)
	///.get('/logout', authenticationController.logout);

module.exports = router;