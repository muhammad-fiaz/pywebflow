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

class SideBar(BaseModel):
    title: str
    icon: str
    url: str


class SidebarResponse(BaseModel):
    visible: bool
    label: str
    default_open: bool
    items: List[SideBar]
