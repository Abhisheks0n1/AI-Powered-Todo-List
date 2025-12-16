import React, { useState } from 'react';
import { addTask } from '../services/api';

interface Props {
  onAdded: () => void;
}

const TaskForm: React.FC<Props> = ({ onAdded }) => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    await addTask({ description, priority, dueDate: dueDate || null });
    setDescription(''); setDueDate('');
    onAdded();
  };

 return (
  <form onSubmit={handleSubmit} className="task-form">
    <div className="task-form-row">
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Enter task description..."
        required
      />
      <select value={priority} onChange={e => setPriority(e.target.value as any)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Add Task</button>
    </div>
  </form>
);
};

export default TaskForm;