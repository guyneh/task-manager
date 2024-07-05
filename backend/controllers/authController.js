// Controllers for user authentication (intermediary between routes and models)

import { isValidEmail, isValidAccessCode, createUser, authenticateUser, updateUser, getAvatarUrl } from '../models/userModel.js';

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
        const avatarUrl = await getAvatarUrl(user.user.id);
        user.user.avatar = avatarUrl;
        res.status(200).json(user);
    } catch (error) {
        console.error("Error during sign-in process:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update Profile Handler
export const updateProfile = async (req, res) => {
    const { userId, name, avatarPath } = req.body;

    try {
        await updateUser(userId, name, avatarPath);
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
        const { data, error } = await supabase.storage.from('avatars').upload(`${user_id}/avatar.png`, avatar.data, {
            contentType: avatar.mimetype,
            upsert: true
        });

        if (error) throw error;

        res.status(200).json({ path: data.path });
    } catch (error) {
        console.error("Error uploading avatar:", error);
        res.status(500).json({ error: 'Error uploading avatar' });
    }
};