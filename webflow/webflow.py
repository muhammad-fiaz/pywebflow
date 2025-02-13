from typing import Dict

import uvicorn
from webflow.modules import parse_arguments, app


from webflow.modules.routes import WebFlow


def get_app():
    return app


def add_node(node_id: str, label: str, position: Dict[str, float], **kwargs):
    WebFlow.add_node(node_id, label, position, **kwargs)

def add_edge(edge_id: str, source: str, target: str, **kwargs):
    WebFlow.add_edge(edge_id, source, target, **kwargs)

def launch():
    args = parse_arguments()
    uvicorn.run(
        get_app(),
        host=args.host,
        port=args.port,
        reload=args.reload,
    )
