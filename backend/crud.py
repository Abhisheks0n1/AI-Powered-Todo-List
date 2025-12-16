from typing import List, Optional
from database import tasks, get_next_id
from models import Task

def create_task(description: str, priority: str, dueDate: Optional[str]) -> Task:
    task = Task(id=get_next_id(), description=description, priority=priority, dueDate=dueDate)
    tasks.append(task)
    return task

def get_tasks() -> List[Task]:
    return tasks[:]

def update_task(id: int, updates: dict) -> Task | None:
    for t in tasks:
        if t.id == id:
            for k, v in updates.items():
                setattr(t, k, v)
            return t
    return None

def delete_task(id: int) -> bool:
    global tasks
    original_len = len(tasks)
    tasks = [t for t in tasks if t.id != id]
    return len(tasks) < original_len