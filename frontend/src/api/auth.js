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
