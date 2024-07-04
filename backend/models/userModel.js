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
        .from('access')
        .select('access_name')
        .eq('access_code', accessCode)
        .single();
    if (error) throw error;
    return data ? data.access_name : null;
};

// Create a new user
export const createUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        if (error.code === 'user_already_exists') {
            throw new Error('Email already registered');
        }
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

    const user_id = data.user.id;
    const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('name, created_at, avatar')
        .eq('user_id', user_id)
        .single();

    if (userError) throw userError;

    return { ...data, user: { ...data.user, ...userDetails } };
};

// Retrieves a user's avatar from the 'avatars' bucket and returns the URL
export const getAvatarUrl = async (user_id) => {
    // Check if the file exists in the storage bucket
    const { data: fileList, error: listError } = await supabase
        .storage
        .from('avatars')
        .list(`${user_id}`, { limit: 1 });

    // If there is an error listing the files or the file doesn't exist, return the default avatar URL
    if (listError || fileList.length === 0) {
        return "https://zymglqnjkxnnfmfojyug.supabase.co/storage/v1/object/public/default_avatar/avatar.png?t=2024-07-04T21%3A30%3A39.738Z";
    }

    // Now attempt to download the avatar
    const { data, error } = await supabase.storage.from('avatars').download(`${user_id}/avatar.png`);
    if (error) throw error;

    const avatarUrl = URL.createObjectURL(data);
    return avatarUrl;
};

// Update user profile row
export const updateUser = async (email, name, avatarPath) => {
    const { data, error } = await supabase
        .from('users')
        .update({ name: name, profile_picture: avatarPath })
        .eq('email', email);

    if (error) {
        console.error("Error updating profile:", error);
        throw new Error('Error updating profile information');
    }

    return data;
};