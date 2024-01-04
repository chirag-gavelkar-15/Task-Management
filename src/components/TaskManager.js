import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    return Object.keys(storedTasks).reduce((acc, category) => {
      acc[category] = storedTasks[category] || [];
      return acc;
    }, {});
  });

  const addTask = (title, category) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks, [category]: [...prevTasks[category], { id: Date.now(), title, category }] };
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const moveTask = (dragIndex, hoverIndex, dragCategory, hoverCategory) => {
    setTasks((prevTasks) => {
      const draggedTask = prevTasks[dragCategory][dragIndex];
      const updatedTasks = { ...prevTasks };

      if (dragCategory === hoverCategory) {
        updatedTasks[dragCategory] = [...prevTasks[dragCategory]];
        updatedTasks[dragCategory].splice(dragIndex, 1);
        updatedTasks[dragCategory].splice(hoverIndex, 0, draggedTask);
      } else {
        // Move to a different category
        draggedTask.category = hoverCategory;
        updatedTasks[dragCategory] = [...prevTasks[dragCategory]];
        updatedTasks[dragCategory].splice(dragIndex, 1);
        updatedTasks[hoverCategory] = [...prevTasks[hoverCategory], draggedTask];
      }

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
      setTasks(storedTasks);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      {Object.keys(tasks).map((category) => (
        <TaskList key={category} category={category} tasks={tasks[category]} moveTask={moveTask} />
      ))}
    </div>
  );
};

export default TaskManager;