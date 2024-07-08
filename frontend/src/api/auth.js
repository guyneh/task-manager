// Frontend functions to interact with the backend API for auth

// Backend URL
const API_URL = "https://task-manager-nu-black.vercel.app/auth";

// Creates a new user
export const signUp = async (formData) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};

// Signs in an existing user
export const signIn = async (formData) => {
    const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};

// Refreshes the user's access token
export const refreshToken = async (refreshToken) => {
    const response = await fetch(`${API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    return response.json();
};

// Checks if the access code is valid
export const checkAccessCode = async (accessCode) => {
    const response = await fetch(`${API_URL}/check-access`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode }),
    });
    return response.json();
};

// Updates the user profile
export const updateProfile = async (userId, name, avatarPath) => {
    const response = await fetch(`${API_URL}/update-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, name, avatarPath }),
    });

    return response.json();
};

// Uploads the user's avatar
export const updateAvatar = async (userId, avatar) => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('avatar', avatar);

    const response = await fetch(`${API_URL}/upload-avatar`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error uploading avatar');
    }

    return response.json();
};

// Retrieve the user's avatar
export const retrieveAvatar = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/retrieve-avatar/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error retrieving avatar');
        }

        // Return the avatar URL, or the default avatar if not found
        const data = await response.json();
        return data.avatarUrl.publicUrl || '/avatar.png';
    } catch (error) {
        return '/avatar.png';
    }
};