from typing import List
from models import Task

tasks: List[Task] = []
next_id = 1

def get_next_id():
    global next_id
    id_ = next_id
    next_id += 1
    return id_