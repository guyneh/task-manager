// Represents an individual task item, displaying its title, description, and status in a table row

import React, { useState } from 'react';
import { FaPencilAlt, FaPlus, FaTimes, FaCheck, FaTrash } from 'react-icons/fa';

interface TaskItemProps {
    task: {
        id: number;
        title: string;
        description: string;
        status: string;
    };
    handleAddTask?: () => void;
    isEditing?: boolean;
    setEditingTask?: (id: number | null) => void;
    handleTaskSubmit?: (task: { id: number; title: string; description: string; status: string }) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleAddTask, isEditing, setEditingTask, handleTaskSubmit }) => {
    // State for editable task
    const [editableTask, setEditableTask] = useState(task);

    // Handle editing the task
    const handleEdit = () => {
        setEditingTask?.(task.id);
    };

    // Handle changes to the editable task
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditableTask({ ...editableTask, [e.target.name]: e.target.value });
    };

    // Handle saving or cancelling the edit of a task
    const handleSave = () => {
        handleTaskSubmit?.(editableTask);
    };
    const handleCancel = () => {
        setEditableTask(task);
        setEditingTask?.(null);
    };

    // Handle deleting a task
    const handleDelete = () => {
        handleTaskSubmit?.({ id: task.id, title: '', description: '', status: '' });
    };

    return (
        <tr className={`task-item ${isEditing ? 'task-item-editing' : ''}`}>
            <td className="task-edit-button">
                {task.title === '' && task.description === '' && task.status === '' ? (
                    <button className="plus-button" onClick={handleAddTask}>
                        <FaPlus size={22} />
                    </button>
                ) : isEditing ? (
                    <div style={{ display: 'flex', marginLeft: '-64px', gap: '4px' }}>
                        <button onClick={handleDelete}>
                            <FaTrash size={20} />
                        </button>
                        <div style={{ borderLeft: '1px solid black', height: '22px' }}></div>
                        <div style={{ display: 'flex' }}>
                            <button onClick={handleSave}>
                                <FaCheck size={22} />
                            </button>
                            <button onClick={handleCancel}>
                                <FaTimes size={22} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleEdit}>
                        <FaPencilAlt size={22} />
                    </button>
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="title"
                        value={editableTask.title}
                        onChange={handleChange}
                        autoFocus
                    />
                ) : (
                    task.title
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="description"
                        value={editableTask.description}
                        onChange={handleChange}
                        style={{ width: '80%' }}
                    />
                ) : (
                    task.description
                )}
            </td>
            <td>
                {isEditing ? (
                    <select
                        name="status"
                        value={editableTask.status}
                        onChange={handleChange}
                        className='task-item-editing'
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                ) : (
                    task.status
                )}
            </td>
        </tr>
    );
};

export default TaskItem;
