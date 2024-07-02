// Connection to the database and user model functions (intermediary between database and controllers)

import supabase from '../config/supabaseClient.js';

// Check if the referral code is valid
export const isValidReferralCode = async (referralCode) => {
    const { data, error } = await supabase
        .from('referrals')
        .select('referral_name')
        .eq('referral_code', referralCode);
    if (error) throw error;
    return data.length > 0;
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