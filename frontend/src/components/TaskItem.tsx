import React from 'react';
import { Task } from '../types';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="cursor-pointer"
        />
        <div className="task-text">
          <p className={task.completed ? 'completed-text' : ''}>
            {task.description}
          </p>
          <div className="task-meta">
            <span className={`priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            {task.dueDate && <span> • Due: {task.dueDate}</span>}
          </div>
        </div>
      </div>
      <button onClick={onDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;