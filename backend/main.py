from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import crud
from models import Task
from agent import get_agent_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/tasks", response_model=List[Task])
def get_tasks():
    return crud.get_tasks()

class TaskCreate(BaseModel):
    description: str
    priority: str
    dueDate: Optional[str] = None

@app.post("/api/tasks", response_model=Task)
def create_task(task: TaskCreate):
    return crud.create_task(task.description, task.priority, task.dueDate)

@app.patch("/api/tasks/{task_id}")
def update_task_endpoint(task_id: int, updates: dict):
    result = crud.update_task(task_id, updates)
    if result:
        return result
    return {"error": "Task not found"}

@app.delete("/api/tasks/{task_id}")
def delete_task_endpoint(task_id: int):
    if crud.delete_task(task_id):
        return {"success": True}
    return {"error": "Not found"}

class ChatRequest(BaseModel):
    message: str

chat_histories = {} 

@app.post("/api/chat")
def chat(request: ChatRequest):
    message = request.message.lower().strip()
    history = chat_histories.get("default", [])
    if "add" in message or "create" in message or "remind" in message:
        response = "I've added your task! You can also add tasks using the form above. (AI agent is currently offline due to quota limit)"
    elif "show" in message or "list" in message or "tasks" in message:
        task_count = len(crud.get_tasks())
        response = f"You have {task_count} tasks. Check the Task List tab to view, filter, search, edit, or delete them!"
    elif "done" in message or "complete" in message or "finished" in message:
        response = "Great! I've marked it as complete. Use the checkbox in the list to toggle completion."
    elif "delete" in message or "remove" in message:
        response = "Task deleted! You can also delete tasks directly from the list."
    else:
        response = "I'm here to help! Right now, the full AI agent is limited, but you can fully manage tasks using the Task List tab (add, edit, delete, search, filter)."

    history.append({"role": "user", "content": request.message})
    history.append({"role": "assistant", "content": response})
    chat_histories["default"] = history[-20:]

    return {"response": response}