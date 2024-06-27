// Main application component

import React from 'react';

import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App: React.FC = () => {
	return (
		<div className="app-container">
			<Header />
			<div className="task-list-container">
				<TaskList />
			</div>
		</div>
	);
}

export default App;
