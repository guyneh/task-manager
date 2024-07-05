// Ensures that the user is authenticated before accessing a route

import supabase from '../config/supabaseClient.js';

// Retrieves user data from the token and attaches it to the request object
export const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = data.user;
    next();
};
