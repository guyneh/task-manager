// Displays a list of tasks in a table format, mapping through the tasks array and rendering TaskItem components

import React, { useState } from 'react';

import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Sample Task', description: 'This is a sample task', status: 'To Do' },
        // more sample tasks
    ]);

    const [addingTask, setAddingTask] = useState(false);

    // Toggle the add task form
    const handleAddTask = () => {
        setAddingTask(!addingTask);
    };

    // Handle task submission
    const handleTaskSubmit = (newTask: { title: string; description: string; status: string }) => {
        const newTaskWithId = { ...newTask, id: tasks.length + 1 };
        setTasks([...tasks, newTaskWithId]);
        setAddingTask(false);
    };

    return (
        <div className="task-list-container">
            <table className="task-list">
                <thead>
                    <tr>
                        <th className="title">Title</th>
                        <th className="description">Description</th>
                        <th className="status">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                    {addingTask && (
                        <tr>
                            <td colSpan={4}>
                                <TaskForm onSubmit={handleTaskSubmit} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="add-task-button" onClick={handleAddTask}>
                {addingTask ? 'Cancel' : <FaPlus />}
            </button>
        </div>
    );
};

export default TaskList;