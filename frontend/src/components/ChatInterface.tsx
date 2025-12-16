import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/api';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const response = await sendChatMessage(input);
    const assistantMsg = { role: 'assistant' as const, content: response.response };
    setMessages(prev => [...prev, assistantMsg]);
  };

  return (
  <div className="chat-container">
    <div className="chat-messages">
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <div className="message-bubble">
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        </div>
      ))}
      {messages.length === 0 && (
        <p className="no-tasks">Say something like: "Add a task to buy milk tomorrow"</p>
      )}
    </div>
    <div className="chat-input-area">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  </div>
);
};

export default ChatInterface;