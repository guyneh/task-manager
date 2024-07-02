// Modal that pops up to allow a user to sign in or sign up

import React, { useState } from 'react';

interface AuthProps {
    onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
    // States for sign in or sign up
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        referralCode: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    // Handle changes to the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle signing in or signing up
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
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
                        Username:
                        <input
                            className="auth-input"
                            type="text"
                            name="username"
                            value={formData.username}
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