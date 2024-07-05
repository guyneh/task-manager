// Frontend functions to interact with the backend API for tasks

// Backend URL
const BASE_URL = 'http://localhost:5001/api';

// Fetch all tasks for the current user
export const fetchTasks = async (token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
};

// Create a new task
export const createTask = async (task, token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

// Update a task
export const updateTask = async (id, task, token) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

// Delete a task
export const deleteTask = async (id, token) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};
