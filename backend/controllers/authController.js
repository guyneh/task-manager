// Controllers for user authentication (intermediary between routes and models)

import { isValidReferralCode, createUser, authenticateUser } from '../models/userModel.js';

// Helper function to validate email
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

// Sign Up Handler
export const signUp = async (req, res) => {
    const { referralCode, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        const isValid = await isValidReferralCode(referralCode);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid referral code' });
        }

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