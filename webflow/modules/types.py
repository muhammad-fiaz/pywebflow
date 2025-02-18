from pydantic import BaseModel
from typing import Dict, List, Optional, Union


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


class ReactFlowConfig(BaseModel):
    colorMode: Optional[str] = None
    nodesDraggable: Optional[bool] = None
    nodesConnectable: Optional[bool] = None
    fitView: Optional[bool] = None
    minZoom: Optional[float] = None
    maxZoom: Optional[float] = None
    proOptions: Optional[Dict[str, Union[bool, str]]] = None
    defaultNodes: Optional[List[NodeData]] = None
    defaultEdges: Optional[List[EdgeData]] = None
    nodeTypes: Optional[Dict[str, str]] = None
    edgeTypes: Optional[Dict[str, str]] = None
    nodeOrigin: Optional[List[float]] = None
    nodeDragThreshold: Optional[int] = None
    nodeClickDistance: Optional[int] = None
    paneClickDistance: Optional[int] = None
    style: Optional[Dict[str, str]] = None
    className: Optional[str] = None
    defaultViewport: Optional[Dict[str, Union[int, float]]] = None
    viewport: Optional[Dict[str, Union[int, float]]] = None
    onViewportChange: Optional[str] = None
    fitViewOptions: Optional[Dict[str, Union[int, float]]] = None
    snapToGrid: Optional[bool] = None
    snapGrid: Optional[List[int]] = None
    onlyRenderVisibleElements: Optional[bool] = None
    translateExtent: Optional[List[List[float]]] = None
    nodeExtent: Optional[List[List[float]]] = None
    preventScrolling: Optional[bool] = None
    attributionPosition: Optional[str] = None
    elevateEdgesOnSelect: Optional[bool] = None
    defaultMarkerColor: Optional[str] = None
    defaultEdgeOptions: Optional[Dict[str, Union[int, float]]] = None
    reconnectRadius: Optional[int] = None
    edgesReconnectable: Optional[bool] = None
    onInit: Optional[str] = None
    onError: Optional[str] = None
    onDelete: Optional[str] = None
    onBeforeDelete: Optional[str] = None
    onNodeClick: Optional[str] = None
    onNodeDoubleClick: Optional[str] = None
    onNodeDragStart: Optional[str] = None
    onNodeDrag: Optional[str] = None
    onNodeDragStop: Optional[str] = None
    onNodeMouseEnter: Optional[str] = None
    onNodeMouseMove: Optional[str] = None
    onNodeMouseLeave: Optional[str] = None
    onNodeContextMenu: Optional[str] = None
    onNodesDelete: Optional[str] = None
    onNodesChange: Optional[str] = None
    onEdgeClick: Optional[str] = None
    onEdgeDoubleClick: Optional[str] = None
    onEdgeMouseEnter: Optional[str] = None
    onEdgeMouseMove: Optional[str] = None
    onEdgeMouseLeave: Optional[str] = None
    onEdgeContextMenu: Optional[str] = None
    onReconnect: Optional[str] = None
    onReconnectStart: Optional[str] = None
    onReconnectEnd: Optional[str] = None
    onEdgesDelete: Optional[str] = None
    onEdgesChange: Optional[str] = None
    onConnect: Optional[str] = None
    onConnectStart: Optional[str] = None
    onConnectEnd: Optional[str] = None
    onClickConnectStart: Optional[str] = None
    onClickConnectEnd: Optional[str] = None
    isValidConnection: Optional[str] = None
    onMove: Optional[str] = None
    onMoveStart: Optional[str] = None
    onMoveEnd: Optional[str] = None
    onPaneClick: Optional[str] = None
    onPaneContextMenu: Optional[str] = None
    onPaneScroll: Optional[str] = None
    onPaneMouseMove: Optional[str] = None
    onPaneMouseEnter: Optional[str] = None
    onPaneMouseLeave: Optional[str] = None
    onSelectionChange: Optional[str] = None
    onSelectionDragStart: Optional[str] = None
    onSelectionDrag: Optional[str] = None
    onSelectionDragStop: Optional[str] = None
    onSelectionStart: Optional[str] = None
    onSelectionEnd: Optional[str] = None
    onSelectionContextMenu: Optional[str] = None
    nodesDraggable: Optional[bool] = None
    nodesConnectable: Optional[bool] = None
    nodesFocusable: Optional[bool] = None
    edgesFocusable: Optional[bool] = None
    elementsSelectable: Optional[bool] = None
    autoPanOnConnect: Optional[bool] = None
    autoPanOnNodeDrag: Optional[bool] = None
    autoPanSpeed: Optional[int] = None
    panOnDrag: Optional[Union[bool, List[int]]] = None
    selectionOnDrag: Optional[bool] = None
    selectionMode: Optional[str] = None
    panOnScroll: Optional[bool] = None
    panOnScrollSpeed: Optional[int] = None
    panOnScrollMode: Optional[str] = None
    zoomOnScroll: Optional[bool] = None
    zoomOnPinch: Optional[bool] = None
    zoomOnDoubleClick: Optional[bool] = None
    selectNodesOnDrag: Optional[bool] = None
    elevateNodesOnSelect: Optional[bool] = None
    connectOnClick: Optional[bool] = None
    connectionMode: Optional[str] = None
    connectionRadius: Optional[int] = None
    connectionLineType: Optional[str] = None
    connectionLineStyle: Optional[Dict[str, str]] = None
    connectionLineComponent: Optional[str] = None
    connectionLineWrapperStyles: Optional[Dict[str, str]] = None
    deleteKeyCode: Optional[Union[str, List[str]]] = None
    selectionKeyCode: Optional[Union[str, List[str]]] = None
    multiSelectionKeyCode: Optional[Union[str, List[str]]] = None
    zoomActivationKeyCode: Optional[Union[str, List[str]]] = None
    panActivationKeyCode: Optional[Union[str, List[str]]] = None
    disableKeyboardA11y: Optional[bool] = None
    noPanClassName: Optional[str] = None
    noDragClassName: Optional[str] = None
    noWheelClassName: Optional[str] = None