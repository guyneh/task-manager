// Header component with Task Manager title and Sign In button

import React, { useEffect, useState } from 'react';
import Auth from './auth/AuthModal';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './auth/ProfileModal';
import ProfilePicture from './auth/ProfilePicture';

// Format today's date as a string
const formatDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Date().toLocaleDateString('en-US', options);
};

const Header: React.FC = () => {
    const { authState } = useAuth();
    const [showAuth, setShowAuth] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        console.log(authState)
    })

    return (
        <div className="header-container">
            <div className="date-container">
                {formatDate()}
            </div>
            <h1 className="header-title">Task Manager</h1>
            {authState.user ? (
                <div className="profile-container" onClick={() => setShowProfile(true)}>
                    <div className="profile-picture-container">
                        <ProfilePicture avatarUrl={authState?.user?.avatar || "avatar.png"} />
                    </div>
                    <span>{authState?.user?.name}</span>
                </div>
            ) : (
                <div className="auth-container">
                    <button className="sign-in-button" onClick={() => setShowAuth(true)}>Sign In</button>
                </div>
            )}
            {showAuth && <Auth onClose={() => setShowAuth(false)} />}
            {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
        </div>
    );
};

export default Header;
