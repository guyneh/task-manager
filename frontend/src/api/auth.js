// Frontend functions to interact with the backend API for auth

// Backend URL
const API_URL = 'http://localhost:5001/auth';

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
export const updateProfile = async (email, name, profilePicturePath) => {
    const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, profilePicturePath }),
    });

    return response.json();
};
