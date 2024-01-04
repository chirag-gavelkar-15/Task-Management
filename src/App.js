import React, { useState ,useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TaskList from './components/TaskList';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), title: newTask, category: 'Added' }];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const moveTask = (dragIndex, hoverIndex, dragCategory, hoverCategory) => {
    const draggedTask = tasks[dragIndex];
    if (dragCategory === hoverCategory) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(dragIndex, 1);
      updatedTasks.splice(hoverIndex, 0, draggedTask);
      setTasks(updatedTasks);
    } else {
      const updatedTasks = tasks.filter((task, index) => index !== dragIndex);
      draggedTask.category = hoverCategory;
      updatedTasks.splice(hoverIndex, 0, draggedTask);
      setTasks(updatedTasks);
    }
    
   
  };
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
 

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
        <h1>Task Manager</h1>
      
        <div>
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <TaskList category="Added" tasks={tasks.filter((task) => task.category === 'Added')} moveTask={moveTask} />
        <TaskList category="Started" tasks={tasks.filter((task) => task.category === 'Started')} moveTask={moveTask} />
        <TaskList category="Completed" tasks={tasks.filter((task) => task.category === 'Completed')} moveTask={moveTask} />
      </div>
    </DndProvider>
  );
};

export default App;
