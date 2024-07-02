// Connection to the database and user model functions (intermediary between database and controllers)

import supabase from '../config/supabaseClient.js';

// Helper function to validate email
export const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

// Check if the access code is valid
export const isValidAccessCode = async (accessCode) => {
    const { data, error } = await supabase
        .from('referrals')
        .select('referral_name')
        .eq('referral_code', accessCode)
        .single();
    if (error) throw error;
    return data ? data.referral_name : null;
};

// Create a new user
export const createUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.error("Error creating user:", error);
        throw new Error('Database error saving new user');
    }

    return data;
};

// Authenticate user
export const authenticateUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw error;
    return data;
};