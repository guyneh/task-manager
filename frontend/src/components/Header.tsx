// Header component with Task Manager title and Sign In button

import React, { useState } from 'react';
import Auth from './Auth';

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
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div className="header-container">
            <div className="date-container">
                {formatDate()}
            </div>
            <h1 className="header-title">Task Manager</h1>
            <button className="sign-in-button" onClick={() => setShowAuth(true)}>Sign In</button>
            {showAuth && <Auth onClose={() => setShowAuth(false)} />}
        </div>
    );
};

export default Header;
