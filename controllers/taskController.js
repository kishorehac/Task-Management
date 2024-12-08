const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const newTask = new Task({
            title,
            description,
            status: status || 'TODO',
            priority,
            dueDate,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const task = await newTask.save();
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

// Retrieve all tasks (excluding soft-deleted tasks)
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ deletedAt: null }); // Exclude tasks that are soft-deleted
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// Retrieve a specific task by ID
exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.deletedAt !== null) return res.status(404).json({ error: 'Task not found or deleted' });
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// Update a task
exports.updateTask = async (req, res, next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedTask || updatedTask.deletedAt !== null) return res.status(404).json({ error: 'Task not found or deleted' });
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

// Soft delete a task
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { deletedAt: new Date() },  // Soft delete (mark as deleted)
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task soft deleted' });
    } catch (error) {
        next(error);
    }
};

// Restore a soft-deleted task
exports.restoreTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        if (task.deletedAt === null) return res.status(400).json({ error: 'Task is not soft-deleted' });

        task.deletedAt = null;  // Restore task by setting deletedAt to null
        await task.save();
        res.status(200).json({ message: 'Task restored' });
    } catch (error) {
        next(error);
    }
};




