// Represents an individual task item, displaying its title, description, and status in a table row

import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

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
    const handleEdit = () => {
        // handle edit logic here
    };

    const handleDelete = () => {
        // handle delete logic here
    };

    return (
        <tr className="task-item">
            {/* Display task title */}
            <td>{task.title}</td>

            {/* Display task description */}
            <td>{task.description}</td>

            {/* Display task status */}
            <td>{task.status}</td>

            {/* Three dots menu for actions */}
            <td>
                <div className="actions-menu">
                    <FaEllipsisV onClick={() => {
                        // Display options for edit and delete
                    }} />
                    {/* Implement the dropdown logic here */}
                </div>
            </td>
        </tr>
    );
};

export default TaskItem;
