import { Task } from '../types';

const API_BASE = 'http://localhost:8000/api';

export const fetchTasks = () => fetch(`${API_BASE}/tasks`).then(res => res.json());

export const addTask = (task: Omit<Task, 'id' | 'completed'>) =>
  fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(res => res.json());

export const updateTask = (id: number, updates: Partial<Task>) =>
  fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }).then(res => res.json());

export const deleteTask = (id: number) =>
  fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });

export const sendChatMessage = (message: string) =>
  fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  }).then(res => res.json());