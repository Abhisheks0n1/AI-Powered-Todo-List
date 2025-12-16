import os
import openai
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

from tools import tools, function_map
import crud 

def get_agent_response(user_message: str, conversation_history: list[dict]) -> str:
    messages = [
        {"role": "system", "content": "You are a helpful todo list assistant. Use tools to manage tasks. Respond conversationally, summarize actions."}
    ] + conversation_history + [{"role": "user", "content": user_message}]

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )

    msg = response.choices[0].message
    if msg.tool_calls:
        for tool_call in msg.tool_calls:
            func_name = tool_call.function.name
            args = eval(tool_call.function.arguments)
            result = function_map[func_name](**args)
            messages.append(msg.dict())
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "name": func_name,
                "content": str(result)
            })
        final_resp = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
        return final_resp.choices[0].message.content
    else:
        return msg.content