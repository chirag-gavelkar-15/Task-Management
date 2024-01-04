import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, index }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index, category: task.category },
  });
  

  return (
    <div ref={drag} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '8px', cursor: 'move' }}>
      {task.title}
    </div>
  );
};

export default Task;