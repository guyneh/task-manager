// Controller functions for handling task-related requests, interacting with the Supabase client to perform CRUD operations

import supabase from '../config/supabaseClient.js';

// Retrieve all tasks for the current user from the database
export const getTasks = async (req, res) => {
    const user_id = req.user.id;
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user_id);

    if (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.status(200).json(data);
};

// Create a new task in the database
export const createTask = async (req, res) => {
    const user_id = req.user.id;
    const { title, description, status } = req.body;
    const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, description, status, user_id }])
        .select();

    if (error) return res.status(500).json({ error });
    res.status(201).json(data[0]);
};

// Update an existing task in the database
export const updateTask = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { data, error } = await supabase
        .from('tasks')
        .update({ title, description, status, updated_at: new Date() })
        .eq('task_id', id)
        .eq('user_id', user_id);

    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
};

// Delete a task from the database
export const deleteTask = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('task_id', id)
        .eq('user_id', user_id);

    if (error) return res.status(500).json({ error });
    res.status(204).end();
};
