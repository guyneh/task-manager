// Defines routes for task-related API endpoints, mapping HTTP requests to the corresponding controller functions

import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Routes for task-related API endpoints
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;