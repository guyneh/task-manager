// Frontend functions to interact with the backend API

// Backend URL
const BASE_URL = 'http://localhost:5001/api';

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks`);
    return await response.json();
};

// Create a new task
export const createTask = async (task) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

// Update a task
export const updateTask = async (id, task) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

// Delete a task
export const deleteTask = async (id) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
};
