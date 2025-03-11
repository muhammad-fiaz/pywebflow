import datetime
from fastapi import APIRouter
from typing import List, Dict

from webflow.modules.webflow_api import WebFlow_API

router = APIRouter()

@router.get("/api/status")
async def get_status():
    """Returns the API status."""
    return {
        "status": "online",
        "message": "Server is running smoothly",
        "timestamp": datetime.datetime.now().isoformat(),
    }

@router.get("/api/pages", response_model=Dict[str, Dict])
async def get_pages():
    """Returns all registered pages and their metadata."""
    return WebFlow_API.pages


# Include the router in FastAPI app
WebFlow_API.app.include_router(router)
