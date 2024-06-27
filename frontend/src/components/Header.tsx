// Header component with Task Manager title and Sign In button

import React from 'react';

// Format today's date as a string
const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Date().toLocaleDateString('en-US', options);
};

const Header: React.FC = () => {
    return (
        <div className="header-container">
            <div className="date-container">
                {formatDate()}
            </div>
            <h1>Task Manager</h1>
            <button className="sign-in-button">Sign In</button>
        </div>
    );
};

export default Header;
