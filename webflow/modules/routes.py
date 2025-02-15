import datetime
import os
from pathlib import Path
from fastapi import APIRouter, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import Dict, List, Optional

from webflow.modules.mount import mount_static_files


class NodeData(BaseModel):
    id: str
    label: str
    position: Dict[str, float]
    dragHandle: Optional[bool] = None
    type: Optional[str] = None
    selected: Optional[bool] = None
    isConnectable: Optional[bool] = None
    zIndex: Optional[int] = None
    positionAbsoluteX: Optional[float] = None
    positionAbsoluteY: Optional[float] = None
    dragging: Optional[bool] = None
    targetPosition: Optional[str] = None
    sourcePosition: Optional[str] = None

    class Config:
        exclude_none = True


class EdgeData(BaseModel):
    id: str
    animated: Optional[bool] = None
    data: Optional[Dict] = None
    style: Optional[Dict] = None
    selected: Optional[bool] = None
    source: str
    target: str
    sourceHandleId: Optional[str] = None
    targetHandleId: Optional[str] = None
    interactionWidth: Optional[int] = None
    sourceX: Optional[float] = None
    sourceY: Optional[float] = None
    targetX: Optional[float] = None
    sourcePosition: Optional[str] = None
    targetPosition: Optional[str] = None
    label: Optional[str] = None
    labelStyle: Optional[Dict] = None
    labelShowBg: Optional[bool] = None
    labelBgStyle: Optional[Dict] = None
    labelBgPadding: Optional[List[int]] = None
    labelBgBorderRadius: Optional[int] = None
    markerStart: Optional[str] = None
    markerEnd: Optional[str] = None
    pathOptions: Optional[Dict] = None

    class Config:
        exclude_none = True


class Metadata(BaseModel):
    title: str
    description: Optional[str] = None
    keywords: Optional[str] = None
    author: Optional[str] = None
    viewport: Optional[str] = None
    charset: Optional[str] = None
    robots: Optional[str] = None
    canonical: Optional[str] = None
    ogTitle: Optional[str] = None
    ogDescription: Optional[str] = None
    ogUrl: Optional[str] = None
    ogImage: Optional[str] = None


def ensure_initialized(method):
    def wrapper(cls, *args, **kwargs):
        if not cls.initialized:
            cls.initialize()
        return method(cls, *args, **kwargs)
    return wrapper


class WebFlow:
    app = FastAPI()
    nodes: List[NodeData] = []
    edges: List[EdgeData] = []
    metadata: Metadata = Metadata(title="PyWebflow", description="Webflow application")
    custom_css: List[str] = []
    custom_js: List[str] = []
    custom_html: List[str] = []
    static_dir: Optional[str] = None
    initialized = False

    @classmethod
    def initialize(cls):
        if cls.initialized:
            return
        cls.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        cls.app.include_router(cls.router)
        mount_static_files(cls.app, static_dir=cls.static_dir)
        cls.initialized = True

    @classmethod
    @ensure_initialized
    def add_node(cls, node_id: str, label: str, position: Dict[str, float], **kwargs):
        node = NodeData(id=node_id, label=label, position=position, **kwargs)
        cls.nodes.append(node)

    @classmethod
    @ensure_initialized
    def add_edge(cls, edge_id: str, source: str, target: str, **kwargs):
        edge = EdgeData(id=edge_id, source=source, target=target, **kwargs)
        cls.edges.append(edge)

    @classmethod
    @ensure_initialized
    def set_metadata(cls, title: str, **kwargs):
        cls.metadata = Metadata(title=title, **kwargs)

    @classmethod
    def set_static_directory(cls, directory: str):
        """Set the directory where CSS & JS files are stored."""
        absolute_directory = Path(directory)
        if absolute_directory.exists():
            mount_static_files(cls.app, static_dir=str(absolute_directory.resolve()))
            cls.static_dir = str(absolute_directory.resolve())
        else:
            raise ValueError(f"Directory {absolute_directory} does not exist.")

    @classmethod
    def set_custom_css(cls, path: str):
        abs_path = f"/static/{path}"
        cls.custom_css.append(abs_path)

    @classmethod
    def set_custom_js(cls, path: str):
        abs_path = f"/static/{path}"
        cls.custom_js.append(abs_path)

    @classmethod
    def set_custom_html(cls, path: str):
        abs_path = f"/static/{path}"
        cls.custom_html.append(abs_path)

    @classmethod
    def serve_file(cls, filename: str):
        if not cls.static_dir:
            raise HTTPException(status_code=500, detail="Static directory not set")
        file_path = Path(cls.static_dir) / filename
        if file_path.exists():
            # Determine media type based on file extension
            media_type = "application/octet-stream"
            if file_path.suffix == ".css":
                media_type = "text/css"
            elif file_path.suffix == ".js":
                media_type = "application/javascript"
            elif file_path.suffix == ".html":
                media_type = "text/html"
            return FileResponse(str(file_path), media_type=media_type)
        else:
            print(f"Warning: {filename} not found in the static directory.")
            raise HTTPException(status_code=404, detail=f"{filename} not found")

    @classmethod
    def launch(cls, host: str = "127.0.0.1", port: int = 8000, reload: bool = True):
        cls.initialize()
        import uvicorn
        uvicorn.run(cls.app, host=host, port=port, reload=reload)

    @classmethod
    def create_router(cls):
        cls.router = APIRouter()

        @cls.router.get("/api/status")
        async def get_status():
            return {
                "status": "online",
                "message": "Server is running smoothly",
                "timestamp": datetime.datetime.now().isoformat(),
            }

        @cls.router.get("/api/nodes", response_model=List[NodeData], response_model_exclude_none=True)
        async def get_nodes():
            return cls.nodes

        @cls.router.get("/api/edges", response_model=List[EdgeData], response_model_exclude_none=True)
        async def get_edges():
            return cls.edges

        @cls.router.get("/api/metadata", response_model=Metadata)
        async def get_metadata():
            return cls.metadata

        @cls.router.get("/api/filepaths")
        async def get_file_paths():
            # This endpoint could still return dynamic paths if needed
            if not cls.custom_css:
                print("Warning: No CSS files found.")
            if not cls.custom_js:
                print("Warning: No JS files found.")
            if not cls.custom_html:
                print("Warning: No HTML files found.")
            return JSONResponse(
                content={
                    "css": cls.custom_css,
                    "js": cls.custom_js,
                    "html": cls.custom_html
                }
            )

        @cls.router.get("/static/{filename:path}")
        async def get_static_file(filename: str):
            return cls.serve_file(filename)

WebFlow.create_router()
WebFlow.initialize()