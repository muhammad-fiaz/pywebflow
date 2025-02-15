from typing import Dict
import uvicorn
from webflow.modules import parse_arguments, app
from webflow.modules.routes import WebFlow_API, Metadata

def get_app():
    return app

def add_node(node_id: str, label: str, position: Dict[str, float], **kwargs):
    WebFlow_API.add_node(node_id, label, position, **kwargs)

def add_edge(edge_id: str, source: str, target: str, **kwargs):
    WebFlow_API.add_edge(edge_id, source, target, **kwargs)

def set_metadata(title: str, **kwargs):
    WebFlow_API.set_metadata(title, **kwargs)

def set_custom_css(css_path: str):
    WebFlow_API.set_custom_css(css_path)

def set_custom_js(js_path: str):
    WebFlow_API.set_custom_js(js_path)

def set_static_directory(directory: str):
    WebFlow_API.set_static_directory(directory)

def set_custom_html(html_path: str):
    WebFlow_API.set_custom_html(html_path)

def launch():
    args = parse_arguments()
    uvicorn.run(
        get_app(),
        host=args.host,
        port=args.port,
        reload=args.reload,
    )
