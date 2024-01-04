import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const TaskList = ({ category, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = tasks.length;

      if (dragIndex === hoverIndex && item.category === category) {
        return;
      }

      moveTask(dragIndex, hoverIndex, item.category, category);
      item.index = hoverIndex;
      item.category = category;
    },
  });

  return (
    <div ref={drop} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '8px' }}>
      <h2>{category}</h2>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;