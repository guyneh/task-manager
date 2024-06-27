// Represents an individual task item, displaying its title, description, and status in a table row

import React from 'react';

interface TaskItemProps {
    task: {
        id: number;
        title: string;
        description: string;
        status: string;
    };
}

// TaskItem component
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <tr className="task-item">
            {/* Display task title */}
            <td>{task.title}</td>

            {/* Display task description */}
            <td>{task.description}</td>

            {/* Display task status */}
            <td>{task.status}</td>

            {/* Buttons for editing and deleting the task */}
            <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
            </td>
        </tr>
    );
};

export default TaskItem;
