// Main application component

import React from 'react';

import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
	return (
		<div className="home-page">
			<header>
				<h1>Task Manager</h1>
				<button className="profile-button">Profile</button>
			</header>
			<TaskForm />
			<TaskList />
		</div>
	);
}

export default App;
