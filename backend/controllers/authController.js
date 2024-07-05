// Controllers for user authentication (intermediary between routes and models)

import { isValidEmail, isValidAccessCode, createUser, authenticateUser, updateUser, uploadUserAvatar, getUserAvatar } from '../models/userModel.js';

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
        console.error("Error during sign-in process:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update Profile Handler
export const updateProfile = async (req, res) => {
    const { userId, name } = req.body;

    try {
        await updateUser(userId, name);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: 'Error updating profile information' });
    }
};

// Upload avatar to storage
export const uploadAvatar = async (req, res) => {
    const user_id = req.body.user_id;
    const avatar = req.files?.avatar;

    if (!user_id || !avatar) {
        return res.status(400).json({ error: 'User ID and avatar file are required' });
    }

    try {
        const publicURL = await uploadUserAvatar(user_id, avatar);
        res.status(200).json({ path: publicURL });
    } catch (error) {
        console.error("Error uploading avatar:", error);
        res.status(500).json({ error: 'Error uploading avatar' });
    }
};

// Retrieve user avatar
export const retrieveAvatar = async (req, res) => {
    const { userId } = req.params;

    try {
        const avatarUrl = await getUserAvatar(userId);
        if (avatarUrl === null) {
            res.status(200).json({ avatarUrl: null });
        } else {
            res.status(200).json({ avatarUrl });
        }
    } catch (error) {
        console.error("Error retrieving avatar:", error);
        res.status(500).json({ error: 'Error retrieving avatar' });
    }
};
