// Main application component

import React from 'react';

import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App: React.FC = () => {
	return (
		<div className="app-container">
			<div className="header-container">
				<Header />
			</div>
			<div className="task-list-wrapper">
				<TaskList />
			</div>
		</div>
	);
}

export default App;
