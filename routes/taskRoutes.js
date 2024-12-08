const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.createTask);

// Retrieve all tasks (excluding soft-deleted tasks)
router.get('/tasks', taskController.getTasks);

// Retrieve a specific task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Soft delete a task
router.delete('/tasks/:id', taskController.deleteTask);

// Restore a soft-deleted task
router.post('/tasks/restore/:id', taskController.restoreTask);

module.exports = router;



