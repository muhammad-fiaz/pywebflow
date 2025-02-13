import datetime
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional

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
    targetY: Optional[float] = None
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

def ensure_initialized(method):
    def wrapper(cls, *args, **kwargs):
        if not hasattr(cls, "initialized") or not cls.initialized:
            cls.initialize()
        return method(cls, *args, **kwargs)
    return wrapper

class WebFlow:
    app = FastAPI()
    nodes: List[NodeData] = []
    edges: List[EdgeData] = []
    initialized = False

    @classmethod
    def initialize(cls):
        if cls.initialized:
            return
        # Set up CORS middleware
        cls.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],  # Consider restricting in production
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        cls.app.include_router(cls.router)
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

        # Use response_model_exclude_none=True to exclude None values
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

# Initialize the router and FastAPI app
WebFlow.create_router()
WebFlow.initialize()
