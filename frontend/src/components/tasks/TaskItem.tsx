// Represents an individual task item, displaying its title, description, and status in a table row

import React, { useState, useEffect } from 'react';
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
    const [showFullText, setShowFullText] = useState<{ field: string; value: string; top: number; left: number }>({ field: '', value: '', top: 0, left: 0 });

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
            if (authState.session && task.task_id.startsWith('temp-')) {
                const createdTask = await createTask(editableTask, authState.session.access_token);
                if (createdTask) {
                    setTasks(tasks.map(t => (t.task_id === task.task_id ? createdTask : t)));
                    setEditableTask(createdTask);
                } else {
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
        }
        setEditableTask(task);
        setEditingTask?.(null);
    };

    // Handle deleting a task
    const handleDelete = () => {
        handleTaskSubmit?.({ task_id: task.task_id, title: '', description: '', status: '' });
    };

    // Handle expanding and collapsing the text
    const handleExpandText = (field: string, value: string, top: number, left: number) => {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const expandedBoxHeight = 100;              // Approximate height of the expanded textbox
        const expandedBoxWidth = 200;               // Approximate width of the expanded textbox

        const adjustedTop = top + window.scrollY + expandedBoxHeight > viewportHeight
            ? top + window.scrollY - expandedBoxHeight
            : top + window.scrollY;

        const adjustedLeft = left + expandedBoxWidth > viewportWidth
            ? left - expandedBoxWidth
            : left;

        setShowFullText({ field, value, top: adjustedTop, left: adjustedLeft });
    };

    const handleCollapseText = () => {
        setShowFullText({ field: '', value: '', top: 0, left: 0 });
    };

    // Close the expanded text box when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            handleCollapseText();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            {showFullText.field && (
                <div
                    className="expanded-textbox"
                    style={{ top: showFullText.top, left: showFullText.left }}
                    onClick={handleCollapseText}
                >
                    {showFullText.value}
                </div>
            )}
            <tr className={`task-item ${isEditing ? 'task-item-editing' : ''}`} onClick={(e) => e.stopPropagation()}>
                <td className="task-edit-button" style={{ position: 'relative', overflow: 'visible' }}>
                    {isEditing ? (
                        <div style={{ display: 'flex', marginLeft: '-64px', gap: '4px' }}>
                            <button onClick={handleDelete} disabled={authState.session ? task.task_id.startsWith('temp-') : false}>
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
                <td className="truncate expandable">
                    {isEditing ? (
                        <input
                            type="text"
                            name="title"
                            value={editableTask.title}
                            onChange={handleChange}
                            className="truncate"
                            autoFocus
                        />
                    ) : (
                        <span onClick={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            handleExpandText('title', task.title, rect.top, rect.right);
                        }}>
                            {task.title}
                        </span>
                    )}
                </td>
                <td className="truncate expandable">
                    {isEditing ? (
                        <input
                            type="text"
                            name="description"
                            value={editableTask.description}
                            onChange={handleChange}
                            className="truncate"
                        />
                    ) : (
                        <span onClick={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            handleExpandText('description', task.description, rect.top, rect.right);
                        }}>
                            {task.description}
                        </span>
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
        </>
    );
};

export default TaskItem;
