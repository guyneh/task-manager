// Displays a list of tasks in a table format, mapping through the tasks array and rendering TaskItem components

import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../api/tasks';
import TaskItem from './TaskItem';

interface Task {
    task_id: string;
    title: string;
    description: string;
    status: string;
}

interface TaskListProps {
    statusFilter: string;
}

const TaskList: React.FC<TaskListProps> = ({ statusFilter }) => {
    const { authState } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    // Fetch tasks when the component mounts
    useEffect(() => {
        const getTasks = async () => {
            if (authState.session) {
                const tasks = await fetchTasks(authState.session.access_token);
                setTasks(tasks);
            }
        };
        getTasks();
    }, [authState]);

    // Toggle the add task form
    const handleAddTask = async () => {
        const newTask: Partial<Task> = { title: '', description: '', status: 'To Do' };
        const createdTask = await createTask(newTask, authState.session.access_token);
        setTasks([...tasks, createdTask]);
        setEditingTaskId(createdTask.task_id);
    };

    // Handle task submission
    const handleTaskSubmit = async (updatedTask: Task) => {
        if (updatedTask.title === '' && updatedTask.description === '' && updatedTask.status === '') {
            await deleteTask(updatedTask.task_id, authState.session.access_token);
            setTasks(tasks.filter(task => task.task_id !== updatedTask.task_id));
        } else {
            await updateTask(updatedTask.task_id, updatedTask, authState.session.access_token);
            setTasks(tasks.map(task => (task.task_id === updatedTask.task_id ? updatedTask : task)));
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
                            key={task.task_id}
                            task={task}
                            isEditing={editingTaskId === task.task_id}
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
