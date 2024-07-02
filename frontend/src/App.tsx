// Main application component

import React from 'react';

import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Filter from './components/Filter';

const App: React.FC = () => {
	// States to manage the filter component
	const [statusFilter, setStatusFilter] = React.useState<string>('');

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
