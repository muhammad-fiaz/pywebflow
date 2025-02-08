# nodeflow/modules/routes.py

from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import JSONResponse

router = APIRouter()


class NodeData(BaseModel):
    id: str
    label: str
    position: dict


class EdgeData(BaseModel):
    id: str
    source: str
    target: str

class Metadata(BaseModel):
    title: str
    description: str


# Define the metadata for each page dynamically
page_metadata = {
    "home": Metadata(
        title="Home Page Title from Backend",
        description="This is the description for the Home page from the backend."
    ),
    "about": Metadata(
        title="About Us - Backend",
        description="Learn more about us with this description fetched from the backend."
    ),
    "contact": Metadata(
        title="Contact Us - Backend",
        description="Get in touch with us through this page."
    )
}


@router.get("/api/nodes", response_model=list[NodeData])
def get_nodes():
    nodes = [
        {"id": "1", "label": "Node 1", "position": {"x": 0, "y": 0}},
        {"id": "2", "label": "Node 2", "position": {"x": 100, "y": 100}},
        {"id": "3", "label": "Node 3", "position": {"x": 200, "y": 200}},
    ]
    return nodes

@router.get("/api/edges", response_model=list[EdgeData])
def get_edges():
    edges = [
        {"id": "e1-2", "source": "1", "target": "2"},
        {"id": "e2-3", "source": "2", "target": "3"},
    ]
    return edges

