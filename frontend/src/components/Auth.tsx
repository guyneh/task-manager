// Modal that pops up to allow a user to sign in or sign up

import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { signIn, signUp, checkAccessCode } from '../api/auth';

interface AuthProps {
    onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
    // States for sign in or sign up
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAccessStep, setIsAccessStep] = useState(true);
    const [isAccessValid, setIsAccessValid] = useState(false);
    const [accessText, setAccessText] = useState('');
    const [formData, setFormData] = useState({ accessCode: '', email: '', password: '', confirmPassword: '' });

    // Clear error message after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => setErrorMessage(''), 5000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

    // Handle changes to the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate email format
    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Check access code
    const handleCheckAccessCode = async () => {
        setErrorMessage('');
        try {
            const response = await checkAccessCode(formData.accessCode);
            if (response.referral_name) {
                setIsAccessValid(true);
                setAccessText(`Code found for: ${response.referral_name}`);
            } else {
                setIsAccessValid(false);
                setAccessText('Invalid access code');
            }
        } catch (error) {
            setIsAccessValid(false);
            setAccessText('Error checking access code');
        }
    };

    // Move to the next step of the sign up form
    const handleContinue = () => {
        setIsAccessStep(false);
    };

    // Handle signing in or signing up
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        if (!validateEmail(formData.email)) {
            setErrorMessage("Invalid email address");
            return;
        }
        if (formData.password.length < 6) {
            setErrorMessage("Password must be at least 6 characters");
            return;
        }
        if (isSignUp && formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            if (isSignUp) {
                const response = await signUp(formData);
                if (response.error) {
                    setErrorMessage(response.error);
                    return;
                }
            } else {
                const response = await signIn(formData);
                if (response.error) {
                    setErrorMessage(response.error);
                    return;
                }
            }
            onClose();
        } catch (error) {
            setErrorMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="auth-modal" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
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
                    {isSignUp && isAccessStep && (
                        <>
                            <label className="auth-label">
                                Access Code:
                                <div className="auth-access">
                                    <input
                                        className="auth-input auth-input-access"
                                        type="text"
                                        name="accessCode"
                                        value={formData.accessCode}
                                        onChange={handleChange}
                                        disabled={isAccessValid}
                                    />
                                    <button type="button" className="access-check-button" onClick={handleCheckAccessCode}>
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </label>
                            <p className={`auth-access-text ${isAccessValid ? 'success' : 'error'}`}>{accessText}</p>
                            <button
                                type="button"
                                className={`auth-button ${!isAccessValid ? 'disabled' : ''}`}
                                onClick={handleContinue}
                                disabled={!isAccessValid}
                            >
                                Continue
                            </button>
                        </>
                    )}
                    {isSignUp && !isAccessStep && (
                        <>
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
                            {errorMessage && <p className="auth-error">{errorMessage}</p>}
                            <button className="auth-button" type="submit">
                                Sign Up
                            </button>
                        </>
                    )}
                    {!isSignUp && (
                        <>
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
                            {errorMessage && <p className="auth-error">{errorMessage}</p>}
                            <button className="auth-button" type="submit">
                                Sign In
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Auth;