tools = [
    {
        "type": "function",
        "function": {
            "name": "create_task",
            "description": "Add a new task",
            "parameters": {
                "type": "object",
                "properties": {
                    "description": {"type": "string"},
                    "priority": {"type": "string", "enum": ["High", "Medium", "Low"]},
                    "dueDate": {"type": ["string", "null"], "format": "date"}
                },
                "required": ["description", "priority"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List all tasks, optionally filtered",
            "parameters": {
                "type": "object",
                "properties": {
                    "priority": {"type": ["string", "null"], "enum": ["High", "Medium", "Low", None]},
                    "completed": {"type": ["boolean", "null"]},
                    "search": {"type": ["string", "null"]}
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update a task (e.g., mark complete)",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "completed": {"type": ["boolean", "null"]},
                    "description": {"type": ["string", "null"]},
                    "priority": {"type": ["string", "null"], "enum": ["High", "Medium", "Low", None]},
                    "dueDate": {"type": ["string", "null"]}
                },
                "required": ["id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Delete a task",
            "parameters": {
                "type": "object",
                "properties": {"id": {"type": "integer"}},
                "required": ["id"]
            }
        }
    }
]

function_map = {
    "create_task": lambda **kwargs: crud.create_task(**kwargs).dict(),
    "list_tasks": lambda **kwargs: [t.dict() for t in crud.get_tasks() if all(
        (kwargs.get('priority') is None or t.priority == kwargs['priority']) and
        (kwargs.get('completed') is None or t.completed == kwargs['completed']) and
        (not kwargs.get('search') or kwargs['search'].lower() in t.description.lower())
    )],
    "update_task": lambda **kwargs: crud.update_task(kwargs['id'], {k: v for k, v in kwargs.items() if k != 'id' and v is not None}) or {"error": "Not found"},
    "delete_task": lambda id: {"success": crud.delete_task(id)}
}