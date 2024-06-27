// Displays a list of tasks in a table format, mapping through the tasks array and rendering TaskItem components

import React, { useState } from 'react';

import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

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
                {addingTask ? 'Cancel' : 'Add Task'}
            </button>
        </div>
    );
};

export default TaskList;
