# AI-Powered Todo List Agent

A full-stack Todo List application with a visual UI and a conversational AI agent.

## Features
- Standard React UI for managing tasks (add, edit, complete, delete, filter).
- Chat interface to manage tasks via natural language using an AI agent.
- Backend powered by FastAPI with in-memory storage.
- AI agent uses OpenAI's function calling (tool calling) to interact with backend tools — adapted for compatibility with modern tool-calling standards like MCP principles.

## Setup and Run Locally

### Prerequisites
- React (for frontend)
- Node.js (for frontend)
- Python 3.10+ (for backend)
- OpenAI API key

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Add your OPENAI_API_KEY
uvicorn main.py --reload


### Frontend
```bash
cd frontend
npm install
npm start