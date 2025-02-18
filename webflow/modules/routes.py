import datetime
from pathlib import Path
from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from typing import Dict, List, Optional

from pydantic import BaseModel

from webflow.logly import logly
from webflow.modules.mount import mount_static_files
from webflow.modules.types import NodeData, EdgeData, Metadata, SideBar, SidebarResponse


def ensure_initialized(method):
    def wrapper(cls, *args, **kwargs):
        if not cls.initialized:
            cls.initialize()
        return method(cls, *args, **kwargs)

    return wrapper


class WebFlow_API:
    app = FastAPI()
    nodes: List[NodeData] = []
    edges: List[EdgeData] = []
    metadata: Metadata = Metadata(title="PyWebflow", description="Webflow application")
    custom_css: List[str] = []
    custom_js: List[str] = []
    custom_html: List[str] = []
    sidebar_visible: bool = False
    sidebar_label: str = "Application"
    sidebar_default_open: bool = False
    sidebar: List[SideBar] = []
    static_dir: Optional[str] = None
    initialized = False
    router = APIRouter()

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
        mount_static_files(cls.app, static_dir=cls.static_dir)
        cls.initialized = True

    @classmethod
    def refresh_static_files(cls):
        cls.custom_css = []
        cls.custom_js = []
        cls.custom_html = []

        if cls.static_dir:
            static_path = Path(cls.static_dir)
            for file_path in static_path.rglob("*"):
                if file_path.is_file():
                    relative_path = file_path.relative_to(static_path)
                    if file_path.suffix == ".css":
                        cls.custom_css.append(f"/static/{relative_path}")
                    elif file_path.suffix == ".js":
                        cls.custom_js.append(f"/static/{relative_path}")
                    elif file_path.suffix == ".html":
                        cls.custom_html.append(f"/static/{relative_path}")

    @classmethod
    @ensure_initialized
    def add_node(cls, node_id: str, label: str, position: Dict[str, float], **kwargs):
        node = NodeData(id=node_id, label=label, position=position, **kwargs)
        cls.nodes.append(node)

    @classmethod
    @ensure_initialized
    def sidebar(cls, visible: bool, label: str, default_open: bool, items: List[Dict[str, str]]):
        cls.sidebar_visible = visible
        cls.sidebar_label = label
        cls.sidebar_default_open = default_open
        cls.sidebar = [SideBar(**item) for item in items]

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
            cls.refresh_static_files()
        else:
            raise ValueError(f"Directory {absolute_directory} does not exist.")

    @classmethod
    def set_custom_css(cls, path: str):
        if not cls.static_dir:
            logly.warn("Static directory not set.")
            return
        abs_path = Path(cls.static_dir) / path
        if not abs_path.exists():
            logly.warn(f"CSS file {path} not found.")
            return
        cls.custom_css.append(f"/static/{path}")

    @classmethod
    def set_custom_js(cls, path: str):
        if not cls.static_dir:
            logly.warn("Static directory not set.")
            return
        abs_path = Path(cls.static_dir) / path
        if not abs_path.exists():
            logly.warn(f"JS file {path} not found.")
            return
        cls.custom_js.append(f"/static/{path}")

    @classmethod
    def set_custom_html(cls, path: str):
        if not cls.static_dir:
            logly.warn("Static directory not set.")
            return
        abs_path = Path(cls.static_dir) / path
        if not abs_path.exists():
            logly.warn(f"HTML file {path} not found.")
            return
        cls.custom_html.append(f"/static/{path}")

    @classmethod
    def serve_file(cls, filename: str):
        if not cls.static_dir:
            logly.warn("Static directory not set.")
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
            # Serve the file with headers to prevent caching
            headers = {"Cache-Control": "no-cache, no-store, must-revalidate"}
            return FileResponse(str(file_path), media_type=media_type, headers=headers)
        else:
            logly.warn(f"{filename} not found in the static directory.")
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

        @cls.router.get(
            "/api/nodes",
            response_model=List[NodeData],
            response_model_exclude_none=True,
        )
        async def get_nodes():
            return cls.nodes

        @cls.router.get(
            "/api/edges",
            response_model=List[EdgeData],
            response_model_exclude_none=True,
        )
        async def get_edges():
            return cls.edges

        @cls.router.get(
            "/api/sidebar",
            response_model=SidebarResponse,
            response_model_exclude_none=True,
        )
        async def get_sidebar():
            return SidebarResponse(
                visible=cls.sidebar_visible,
                label=cls.sidebar_label,
                default_open=cls.sidebar_default_open,
                items=cls.sidebar
            )

        @cls.router.get("/api/metadata", response_model=Metadata)
        async def get_metadata():
            return cls.metadata

        @cls.router.get("/api/filepaths")
        async def get_file_paths():
            cls.refresh_static_files()
            warnings = {
                "css": [],
                "js": [],
                "html": [],
            }
            for path in cls.custom_css:
                if not (Path(cls.static_dir) / path.replace("/static/", "")).exists():
                    warnings["css"].append(path)
            for path in cls.custom_js:
                if not (Path(cls.static_dir) / path.replace("/static/", "")).exists():
                    warnings["js"].append(path)
            for path in cls.custom_html:
                if not (Path(cls.static_dir) / path.replace("/static/", "")).exists():
                    warnings["html"].append(path)

            if warnings["css"]:
                logly.warn(f"CSS files not found: {warnings['css']}")
            if warnings["js"]:
                logly.warn(f"JS files not found: {warnings['js']}")
            if warnings["html"]:
                logly.warn(f"HTML files not found: {warnings['html']}")

            return JSONResponse(
                content={
                    "css": cls.custom_css,
                    "js": cls.custom_js,
                    "html": cls.custom_html,
                }
            )

        @cls.router.get("/static/{filename:path}")
        async def get_static_file(filename: str):
            return cls.serve_file(filename)

        cls.app.include_router(cls.router)


WebFlow_API.create_router()
WebFlow_API.initialize()