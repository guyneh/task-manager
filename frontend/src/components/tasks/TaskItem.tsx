// Represents an individual task item, displaying its title, description, and status in a table row

import React, { useState } from 'react';
import { FaPencilAlt, FaTimes, FaCheck, FaTrash } from 'react-icons/fa';
import { createTask } from '../../api/tasks';
import { useAuth } from '../../context/AuthContext';
import { Task } from './TaskList';

interface TaskItemProps {
    task: {
        task_id: string;
        title: string;
        description: string;
        status: string;
    };
    isEditing?: boolean;
    setEditingTask?: (id: string | null) => void;
    handleTaskSubmit?: (task: { task_id: string; title: string; description: string; status: string }) => void;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    tasks: Task[];
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isEditing, setEditingTask, handleTaskSubmit, setTasks, tasks }) => {
    // State for editable task
    const { authState } = useAuth();
    const [editableTask, setEditableTask] = useState(task);

    // Handle editing the task
    const handleEdit = () => {
        setEditingTask?.(task.task_id);
    };

    // Handle changes to the editable task
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditableTask({ ...editableTask, [e.target.name]: e.target.value });
    };

    // Handle saving the edit of a task
    const isSaveDisabled = editableTask.title?.trim() === '';
    const handleSave = async () => {
        try {
            if (task.task_id.startsWith('temp-')) {
                const createdTask = await createTask(editableTask, authState.session.access_token);
                if (createdTask) {
                    setTasks(tasks.map(t => (t.task_id === task.task_id ? createdTask : t)));
                    setEditableTask(createdTask);
                } else {
                    // Handle the case where createdTask is null
                    console.error('Created task is null');
                }
            } else {
                await handleTaskSubmit?.(editableTask);
            }
        } catch (error) {
            console.error('Error saving task:', error);
        } finally {
            setEditingTask?.(null);
        }
    };

    // Handle cancelling the edit of a task
    const handleCancel = () => {
        if (task.task_id.startsWith('temp-')) {
            setTasks(tasks.filter(t => t.task_id !== task.task_id));
        } else {
            setEditableTask(task);
            setEditingTask?.(null);
        }
    };

    // Handle deleting a task
    const handleDelete = () => {
        handleTaskSubmit?.({ task_id: task.task_id, title: '', description: '', status: '' });
    };

    return (
        <tr className={`task-item ${isEditing ? 'task-item-editing' : ''}`}>
            <td className="task-edit-button">
                {isEditing ? (
                    <div style={{ display: 'flex', marginLeft: '-64px', gap: '4px' }}>
                        <button onClick={handleDelete} disabled={task.task_id.startsWith('temp-')}>
                            <FaTrash size={20} />
                        </button>
                        <div style={{ borderLeft: '1px solid black', height: '22px' }}></div>
                        <div style={{ display: 'flex' }}>
                            <button onClick={handleSave} disabled={isSaveDisabled}>
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