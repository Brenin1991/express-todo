const express = require('express');
const taskController = require('../controllers/taskController.js');
const { protect } = require('../controllers/authenticationController.js');

const router = express.Router();
router
	.get('/AddTask', protect, taskController.addTask)
	.post('/AddTask', protect, taskController.validateTask)
	.get('/ViewTask/:id', protect, taskController.viewTask)
	.get('/Complete/:id', protect, taskController.completeTask)
	.get('/Update/:id', protect, taskController.updateTask)
    .post('/Update', protect, taskController.validateUpdate)
    .get('/Delete/:id', protect, taskController.deleteTask)
    .get('/Clear/', protect, taskController.clearTasks);

module.exports = router;