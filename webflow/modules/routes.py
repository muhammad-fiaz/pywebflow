import datetime
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from typing import List

from webflow.modules.types import NodeData, EdgeData, Metadata, SidebarResponse, HtmlContent, ReactFlowConfig
from webflow.modules.webflow_api import WebFlow_API

router = APIRouter()

@router.get("/api/status")
async def get_status():
    return {
        "status": "online",
        "message": "Server is running smoothly",
        "timestamp": datetime.datetime.now().isoformat(),
    }

@router.get("/api/nodes", response_model=List[NodeData])
async def get_nodes():
    return WebFlow_API.nodes

@router.get("/api/edges", response_model=List[EdgeData])
async def get_edges():
    return WebFlow_API.edges

@router.get("/api/sidebar", response_model=SidebarResponse)
async def get_sidebar():
    items = WebFlow_API.sidebar if isinstance(WebFlow_API.sidebar, list) else []
    return SidebarResponse(
        visible=WebFlow_API.sidebar_visible,
        label=WebFlow_API.sidebar_label,
        default_open=WebFlow_API.sidebar_default_open,
        items=items
    )


@router.get("/api/metadata", response_model=Metadata)
async def get_metadata():
    return WebFlow_API.metadata

@router.get("/api/config", response_model=List[ReactFlowConfig])
async def get_config():
    return WebFlow_API.config

@router.get("/api/html")
async def get_html():
    return {"content": WebFlow_API.get_html()}

@router.post("/api/html")
async def set_html(content: HtmlContent):
    WebFlow_API.add_html(content.content)
    return {"status": "success"}

@router.get("/api/filepaths")
async def get_file_paths():
    WebFlow_API.refresh_static_files()
    return JSONResponse(content={
        "css": WebFlow_API.custom_css,
        "js": WebFlow_API.custom_js,
        "html": WebFlow_API.custom_html,
    })

@router.get("/static/{filename:path}")
async def get_static_file(filename: str):
    return WebFlow_API.serve_file(filename)

WebFlow_API.app.include_router(router)

