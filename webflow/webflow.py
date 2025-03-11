import uvicorn
import logging
from typing import Dict
from contextlib import contextmanager
from webflow.ascii import ascii_art
from webflow.modules import parse_arguments, WebFlow_API

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | [WebFlow] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("WebFlow")

@contextmanager
def page(route: str, metadata: Dict = None):
    """Registers a new page with metadata."""
    WebFlow_API.add_page(route, metadata or {})
    try:
        yield
    finally:
        pass  # Cleanup if needed

def get_app():
    """Returns the FastAPI application instance."""
    return WebFlow_API.app

def add_node(node_id: str, label: str, position: Dict[str, float], **kwargs):
    """Adds a node to the last registered page."""
    WebFlow_API.add_node(node_id, label, position, **kwargs)

def add_edge(edge_id: str, source: str, target: str, **kwargs):
    """Adds an edge to the last registered page."""
    WebFlow_API.add_edge(edge_id, source, target, **kwargs)

def launch(attributes=True, authentication: Dict[str, str] = None):
    """Starts the FastAPI server."""
    args = parse_arguments()
    WebFlow_API.initialize()

    if attributes:
        print(ascii_art)  # Print ASCII art if enabled

    WebFlow_API.set_authentication(authentication)

    logger.info(f"🚀 Launching WebFlow API at http://{args.host}:{args.port} (Reload: {args.reload})")

    # Custom logging configuration for Uvicorn and FastAPI
    custom_log_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "defaultFormatter": {
                "()": "uvicorn.logging.DefaultFormatter",
                "fmt": "%(levelprefix)s %(asctime)s | [WebFlow] %(message)s",
                "use_colors": True,
            },
        },
        "handlers": {
            "default": {
                "class": "logging.StreamHandler",
                "formatter": "defaultFormatter",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "uvicorn.error": {"handlers": ["default"], "level": "INFO"},
            "uvicorn.access": {"handlers": ["default"], "level": "INFO", "propagate": False},
            "fastapi": {"handlers": ["default"], "level": "INFO"},
        },
    }

    uvicorn.run(
        get_app(),
        host=args.host,
        port=args.port,
        reload=args.reload,
        log_config=custom_log_config,
    )
