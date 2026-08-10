from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import random
import json
from datetime import datetime
import redis.asyncio as aioredis

app = FastAPI()

# Connect to the Redis container defined in your docker-compose
REDIS_URL = "redis://redis:6379"

MACRO_EVENTS = [
    {"type": "market", "color": "text-red-400", "bg": "bg-red-950/20 border-red-900/30", "message": "Global market dip detected. Tech stocks down 4.2%."},
    {"type": "market", "color": "text-emerald-400", "bg": "bg-emerald-950/20 border-emerald-900/30", "message": "Vertex Corp posts record quarterly profits."},
    {"type": "politics", "color": "text-zinc-300", "bg": "bg-zinc-900/50 border-zinc-800/50", "message": "Emergency council meeting called regarding infrastructure decay."},
    {"type": "incident", "color": "text-amber-400", "bg": "bg-amber-950/20 border-amber-900/30", "message": "Unsanctioned labor strikes forming at industrial hubs."},
    {"type": "environment", "color": "text-blue-400", "bg": "bg-blue-950/20 border-blue-900/30", "message": "Severe acid rain warning issued for the Eastern Seaboard."},
]

@app.websocket("/ws/events")
async def macro_event_stream(websocket: WebSocket):
    await websocket.accept()
    
    # Initialize async Redis client
    redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)
    
    try:
        while True:
            await asyncio.sleep(random.randint(4, 8))
            
            event = random.choice(MACRO_EVENTS)
            payload = {
                "time": datetime.utcnow().strftime("%H:%M:%S"),
                "sector": f"SECTOR {random.randint(1, 12)}",
                "color": event["color"],
                "bg": event["bg"],
                "message": event["message"]
            }
            
            # 1. Send to Next.js UI via WebSocket
            await websocket.send_text(json.dumps(payload))
            
            # 2. Publish to Redis channel so the Rust engine can catch it
            await redis_client.publish("global_events", json.dumps(payload))
            
    except WebSocketDisconnect:
        await redis_client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)