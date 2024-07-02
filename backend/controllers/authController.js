// Controllers for user authentication (intermediary between routes and models)

import { isValidEmail, isValidAccessCode, createUser, authenticateUser } from '../models/userModel.js';

// Check Access Code Handler
export const checkAccess = async (req, res) => {
    const { accessCode } = req.body;

    try {
        const accessName = await isValidAccessCode(accessCode);
        if (accessName) {
            res.status(200).json({ access_name: accessName });
        } else {
            res.status(400).json({ error: 'Invalid access code' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sign Up Handler
export const signUp = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        const user = await createUser(email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sign In Handler
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};