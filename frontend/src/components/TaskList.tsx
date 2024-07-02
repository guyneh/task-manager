// Displays a list of tasks in a table format, mapping through the tasks array and rendering TaskItem components

import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import TaskItem from './TaskItem';

interface TaskListProps {
    statusFilter: string;
}

const TaskList: React.FC<TaskListProps> = ({ statusFilter }) => {
    // States for list of tasks and task being edited
    const [tasks, setTasks] = useState([{ id: 1, title: 'Sample Task', description: 'This is a sample task', status: 'To Do' }]);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    // Toggle the add task form
    const handleAddTask = () => {
        setEditingTaskId(tasks.length + 1);
        setTasks([...tasks, { id: tasks.length + 1, title: '', description: '', status: 'To Do' }]);
    };

    // Handle task submission
    const handleTaskSubmit = (updatedTask: { id: number; title: string; description: string; status: string }) => {
        if (updatedTask.title === '' && updatedTask.description === '' && updatedTask.status === '') {
            setTasks(tasks.filter(task => task.id !== updatedTask.id));
        } else {
            setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        }
        setEditingTaskId(null);
    };

    // Filter tasks based on status
    const filteredTasks = tasks.filter(task => statusFilter === '' || task.status === statusFilter);

    return (
        <div>
            <table className="task-list">
                <thead>
                    <tr>
                        <th></th>
                        <th className="title">Title</th>
                        <th className="description">Description</th>
                        <th className="status">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            isEditing={editingTaskId === task.id}
                            setEditingTask={setEditingTaskId}
                            handleTaskSubmit={handleTaskSubmit}
                        />
                    ))}
                    {editingTaskId === null && (
                        <tr>
                            <td className="task-edit-button">
                                <button className="plus-button" onClick={handleAddTask}>
                                    <FaPlus size={22} />
                                </button>
                            </td>
                            <td colSpan={3}></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
