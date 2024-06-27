// Displays a list of tasks in a table format, mapping through the tasks array and rendering TaskItem components

import React from 'react';

import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
    // Sample tasks data (replace with actual data from state or props)
    const tasks = [
        { id: 1, title: 'Sample Task', description: 'This is a sample task', status: 'To Do' },
        // more sample tasks
    ];

    return (
        <div className="task-list-container">
            <table className="task-list">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
