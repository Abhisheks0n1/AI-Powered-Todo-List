import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [tab, setTab] = useState<'list' | 'chat'>('list');

  return (
    <div className="container">
      <header>
        <h1>AI-Powered Todo List</h1>
        <p>Manage tasks visually or chat with your AI agent</p>
      </header>

      <div className="tabs">
        <button
          onClick={() => setTab('list')}
          className={`tab-btn ${tab === 'list' ? 'active' : ''}`}
        >
          Task List
        </button>
        <button
          onClick={() => setTab('chat')}
          className={`tab-btn ${tab === 'chat' ? 'active' : ''}`}
        >
          Chat Agent
        </button>
      </div>

      <main>
        {tab === 'list' ? <TodoList /> : <ChatInterface />}
      </main>
    </div>
  );
};

export default App;