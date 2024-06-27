// Header component with Task Manager title and Sign In button

import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="header-container">
            <h1>Task Manager</h1>
            <button className="sign-in-button">Sign In</button>
        </div>
    );
};

export default Header;
