// Component to filter tasks by their status

import React from 'react';

interface FilterProps {
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

const Filter: React.FC<FilterProps> = ({ statusFilter, setStatusFilter }) => {
    return (
        <div className="filter-container">
            <label htmlFor="statusFilter">Filter: </label>
            <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
};

export default Filter;
