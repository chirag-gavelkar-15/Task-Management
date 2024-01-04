import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask.trim(), 'Added');
      setNewTask('');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;