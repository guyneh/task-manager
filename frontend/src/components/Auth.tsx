// Modal that pops up to allow a user to sign in or sign up

import React, { useState } from 'react';
import { signIn, signUp } from '../api/auth';

interface AuthProps {
    onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
    // States for sign in or sign up
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        referralCode: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Handle changes to the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate email format
    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Handle signing in or signing up
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            alert("Invalid email address");
            return;
        }
        if (isSignUp) {
            const response = await signUp(formData);
            console.log(response);
        } else {
            const response = await signIn(formData);
            console.log(response);
        }
        onClose();
    };

    return (
        <div className="auth-modal">
            <div className="auth-modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${!isSignUp ? 'active' : ''}`}
                        onClick={() => setIsSignUp(false)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${isSignUp ? 'active' : ''}`}
                        onClick={() => setIsSignUp(true)}
                    >
                        Sign Up
                    </button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <label className="auth-label">
                            Referral Code:
                            <input
                                className="auth-input"
                                type="text"
                                name="referralCode"
                                value={formData.referralCode}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    <label className="auth-label">
                        Email:
                        <input
                            className="auth-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="auth-label">
                        Password:
                        <input
                            className="auth-input"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {isSignUp && (
                        <label className="auth-label">
                            Confirm Password:
                            <input
                                className="auth-input"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    )}
                    <button className="auth-button" type="submit">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;