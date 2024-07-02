// Controllers for user authentication (intermediary between routes and models)

import { isValidEmail, isValidAccessCode, createUser, authenticateUser, updateUser } from '../models/userModel.js';

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

// Update Profile Handler
export const updateProfile = async (req, res) => {
    const { email, name } = req.body;
    const profilePicture = req.files?.profilePicture;

    try {
        let profilePicturePath = '';
        if (profilePicture) {
            const { data, error } = await supabase.storage.from('profiles').upload(`public/${email}/profile_picture`, profilePicture.data, {
                contentType: profilePicture.mimetype,
            });

            if (error) throw error;
            profilePicturePath = data.path;
        }

        await updateUser(email, name, profilePicturePath);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: 'Error updating profile information' });
    }
};
