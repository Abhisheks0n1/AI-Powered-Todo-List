import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { fetchTasks, updateTask, deleteTask } from '../services/api';
import TaskForm from './TaskForm';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [editDueDate, setEditDueDate] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const toggleComplete = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('');
    setDateFilter('');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesDate = !dateFilter || task.dueDate === dateFilter;
    return matchesSearch && matchesPriority && matchesDate;
  });

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
  };

  const saveEdit = async () => {
    if (!editingTask || !editDescription.trim()) return;
    await updateTask(editingTask.id, {
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate || null
    });
    setEditingTask(null);
    loadTasks();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Your Tasks
      </h2>
      <div className="task-form mb-8">
        <div className="task-form-row">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="premium-input"
          />
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="premium-select"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="premium-date"
          />
          <button
            onClick={clearFilters}
            className="premium-btn" 
          >
            Clear Filter
          </button>
        </div>
      </div>

      <TaskForm onAdded={loadTasks} />

      <div className="task-list mt-8">
        {loading ? (
          <p className="no-tasks">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="no-tasks">
            {tasks.length === 0 ? "No tasks yet. Add one above!" : "No tasks match your filters."}
          </p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
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
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(task)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <input
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              className="premium-input mb-3"
              placeholder="Description"
            />
            <select
              value={editPriority}
              onChange={e => setEditPriority(e.target.value as any)}
              className="premium-select mb-3"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input
              type="date"
              value={editDueDate || ''}
              onChange={e => setEditDueDate(e.target.value)}
              className="premium-date mb-6"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditingTask(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="premium-btn"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;