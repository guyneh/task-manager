// Provides a form to create a new task, including fields for title, description, and status

import React, { useState } from 'react';

const TaskForm: React.FC = () => {
    // State variables for task title, description, and status
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // handle task submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            {/* Input field for task title */}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            {/* Textarea for task description */}
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Dropdown for task status */}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            {/* Submit button */}
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
