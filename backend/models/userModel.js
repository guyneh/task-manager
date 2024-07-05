// Connection to the database and user model functions (intermediary between database and controllers)

import supabase from '../config/supabaseClient.js';
import supabaseAdmin from '../config/supabaseAdmin.js';

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

// Signs in a user
export const authenticateUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw error;

    const user_id = data.user.id;
    const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('name, avatar')
        .eq('user_id', user_id)
        .single();

    if (userError) throw userError;

    // Merge name and avatar into user_metadata
    return {
        ...data,
        user: {
            ...data.user,
            user_metadata: {
                ...data.user.user_metadata,
                name: userDetails.name,
                avatar: userDetails.avatar
            }
        }
    };
};

// Retrieves a user's avatar URL from the 'avatars' bucket
export const getUserAvatar = async (userId) => {
    try {
        // List files in the user's avatar directory
        const { data: fileList, error: listError } = await supabase
            .storage
            .from('avatars')
            .list(`${userId}`, { limit: 1 });

        // If there's an error or no files are found, return null
        if (listError || fileList.length === 0) {
            return null;
        }

        // Generate a public URL for the first file found
        const { data: publicURL, error: urlError } = supabase.storage
            .from('avatars')
            .getPublicUrl(`${userId}/${fileList[0].name}`);

        if (urlError) throw urlError;

        return publicURL;
    } catch (error) {
        console.error("Error retrieving avatar:", error);
        return null;
    }
};

// Update user profile row
export const updateUser = async (userId, name, avatarPath) => {
    const { data, error } = await supabase
        .from('users')
        .update({ name: name, avatar: avatarPath })
        .eq('user_id', userId);

    if (error) {
        console.error("Error updating profile:", error);
        throw new Error('Error updating profile information');
    }

    return data;
};

// Delete the existing avatar from storage
export const deleteExistingAvatar = async (userId) => {
    const { data, error } = await supabaseAdmin
        .storage
        .from('avatars')
        .remove([`${userId}/avatar.png`]);

    if (error) throw error;
};

// Upload user avatar
export const uploadUserAvatar = async (userId, avatar) => {
    try {
        // Delete the existing avatar
        await deleteExistingAvatar(userId);

        const { data, error } = await supabaseAdmin.storage
            .from('avatars')
            .upload(`${userId}/${avatar.name}`, avatar.data, {
                contentType: avatar.mimetype,
                upsert: true
            });

        if (error) throw error;

        // Generate a public URL for the uploaded file
        const { publicURL, error: urlError } = supabase.storage
            .from('avatars')
            .getPublicUrl(`${userId}/${avatar.name}`);

        if (urlError) throw urlError;

        // Update user's avatar URL in the database
        const { data: updateData, error: updateError } = await supabase
            .from('users')
            .update({ avatar: publicURL })
            .eq('user_id', userId);

        if (updateError) throw updateError;

        return publicURL;
    } catch (error) {
        console.error("Error uploading avatar:", error);
        throw new Error('Error uploading avatar');
    }
};