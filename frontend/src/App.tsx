// Main application component

import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TaskList from './components/tasks/TaskList';
import Filter from './components/tasks/Filter';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
	const { refreshAccessToken } = useAuth();

	// States to manage the filter component
	const [statusFilter, setStatusFilter] = React.useState<string>('');

	// Check the access token every hour and refresh it if it is expired
	useEffect(() => {
		const interval = setInterval(() => {
			refreshAccessToken();
		}, 60 * 60 * 1000);

		return () => clearInterval(interval);
	}, [refreshAccessToken]);

	return (
		<div className='app-container'>
			<div className="header-container">
				<Header />
				<div className="filter-container">
					<Filter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
				</div>
			</div>
			<div className="task-list-container">
				<TaskList statusFilter={statusFilter} />
			</div>
		</div>
	);
}

export default App;
