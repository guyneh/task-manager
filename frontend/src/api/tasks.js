// Frontend functions to interact with the backend API for tasks

// Backend URL
const BASE_URL = 'http://localhost:5001/api';

// Fetch all tasks for the current user via the token
export const fetchTasks = async (token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
};

// Create a new task
export const createTask = async (task, token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
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
            'Authorization': token,
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
            'Authorization': token,
        },
    });
};
