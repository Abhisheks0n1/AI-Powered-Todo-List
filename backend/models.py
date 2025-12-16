from pydantic import BaseModel
from typing import Literal, Optional

class Task(BaseModel):
    id: int
    description: str
    priority: Literal['High', 'Medium', 'Low']
    dueDate: Optional[str] = None 
    completed: bool = False