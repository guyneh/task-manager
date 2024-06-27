// Header component with Task Manager title and Sign In button

import React from 'react';

import '../App.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>Task Manager</h1>
            <button className="sign-in-button">Sign In</button>
        </header>
    );
};

export default Header;
