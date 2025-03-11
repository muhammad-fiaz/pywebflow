import datetime
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import Dict, List, Optional

from webflow.modules.mount import mount_static_files
from webflow.modules.types import (
    NodeData,
    EdgeData,
    Metadata,
    SideBar,
    ReactFlowConfig,
)


def ensure_initialized(method):
    def wrapper(cls, *args, **kwargs):
        if not cls.initialized:
            cls.initialize()
        return method(cls, *args, **kwargs)
    return wrapper


class WebFlow_API:
    app = FastAPI()
    initialized = False
    pages: Dict[str, Dict] = {}


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
        mount_static_files(cls.app)
        cls.initialized = True

    @classmethod
    def add_page(cls, route: str, metadata: Dict):
        """Registers a page dynamically."""
        cls.pages[route] = {"metadata": metadata, "nodes": [], "edges": []}

    @classmethod
    def add_node(cls, node_id: str, label: str, position: Dict[str, float], **kwargs):
        """Adds a node to the last registered page."""
        if not cls.pages:
            raise ValueError("No page registered! Use 'with page(route=...)' first.")
        last_page = list(cls.pages.keys())[-1]
        cls.pages[last_page]["nodes"].append(
            {"id": node_id, "label": label, "position": position, **kwargs}
        )

    @classmethod
    def add_edge(cls, edge_id: str, source: str, target: str, **kwargs):
        """Adds an edge to the last registered page."""
        if not cls.pages:
            raise ValueError("No page registered! Use 'with page(route=...)' first.")
        last_page = list(cls.pages.keys())[-1]
        cls.pages[last_page]["edges"].append(
            {"id": edge_id, "source": source, "target": target, **kwargs}
        )


    @classmethod
    def launch(cls, host: str = "127.0.0.1", port: int = 8000, reload: bool = True, authentication: Dict[str, str] = None):
        if authentication:
            cls.set_authentication(authentication)
        cls.initialize()
        import uvicorn
        uvicorn.run(cls.app, host=host, port=port, reload=reload)

    @classmethod
    def set_authentication(cls, authentication: Dict[str, str]):
        cls.authentication = authentication

