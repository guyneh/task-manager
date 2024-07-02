// Controller functions for handling task-related requests, interacting with the Supabase client to perform CRUD operations

import supabase from '../config/supabaseClient.js';

// Retrieve all tasks from the database
export const getTasks = async (req, res) => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
};

// Create a new task in the database
export const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const { data, error } = await supabase.from('tasks').insert([{ title, description, status }]);
    if (error) return res.status(500).json({ error });
    res.status(201).json(data);
};

// Update an existing task in the database
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { data, error } = await supabase.from('tasks').update({ title, description, status }).eq('id', id);
    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
};

// Delete a task from the database
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) return res.status(500).json({ error });
    res.status(204).end();
};
