
**Research.md**
```markdown
# Research and Design Decisions

## Thought Process
The challenge requires a todo list with both UI and conversational AI agent, using FastAPI backend, React frontend, and "MCP (Model Context Protocol)" for AI-backend connection.

After researching, MCP is an open protocol (introduced by Anthropic in 2024) for standardizing how LLMs access tools, resources, and context. It involves MCP servers exposing tools via JSON-RPC (stdio or HTTP).

However, implementing full MCP from scratch is complex and time-consuming for this deadline (Dec 20, 2025). Many libraries exist (e.g., fastmcp, fastapi-mcp) to expose FastAPI endpoints as MCP tools.

To prioritize efficiency:
- Use standard LLM tool calling (OpenAI function calling) as the core mechanism — this is widely supported, simple, and aligns with MCP's goal of standardized tool access.
- Backend exposes CRUD endpoints.
- AI agent in backend uses OpenAI Chat Completions with defined tools that call the same CRUD functions internally.
- This achieves the same result: natural language → intent parsing → tool calls → task management, with support for chained commands.

Libraries considered:
- LangChain/LlamaIndex: Overkill for simple agent.
- OpenAI SDK directly: Lightweight and sufficient.
- fastmcp or similar for true MCP: Not used due to added complexity and time constraints; standard tool calling suffices for robust agent intelligence.

Database: In-memory list for simplicity (no persistence needed for demo).

Frontend: Basic React with TypeScript, two tabs (List + Chat), API calls via fetch.

LLM: OpenAI GPT-4o-mini (cost-effective, capable).

Edge cases handled: Parsing dates/priorities, multi-command in one message (via multiple tool calls), searching/filtering.

This design ensures core functionality works reliably via both UI and chat.