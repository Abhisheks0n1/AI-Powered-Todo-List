export interface Task {
  id: number;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string | null;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}