// Main application component

import React from 'react';

import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App: React.FC = () => {
	return (
		<div className="home-page">
			<Header />
			<TaskList />
		</div>
	);
}

export default App;
