// Frontend functions to interact with the backend API for tasks

// Backend URL
const BASE_URL = process.env.REACT_APP_API_URL + '/api';

// Fetch all tasks for the current user via the token
export const fetchTasks = async (token) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
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
    console.log(response)

    if (!response.ok) {
        const error = await response.json();
        console.error('Error creating task:', error);
        throw new Error('Failed to create task');
    }

    // Ensure the API returns the created task
    const createdTask = await response.json();
    console.log(createdTask)
    return createdTask;
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
