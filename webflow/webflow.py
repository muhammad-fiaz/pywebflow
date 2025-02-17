from typing import Dict
import uvicorn

from webflow.logly import logly
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

    # Log launch details using Logly.
    logly.Config(color_enabled=True)
    logly.info(
        "Launching application",
        f"Host: {args.host}, Port: {args.port}, Reload: {args.reload}",
        color=logly.COLOR.GREEN,
    )

    # Custom logging configuration for Uvicorn and FastAPI
    custom_log_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "pywebflowFormatter": {
                "()": "uvicorn.logging.DefaultFormatter",
                "fmt": "%(levelprefix)s %(asctime)s | [pywebflow] %(message)s",
                "use_colors": True,
            },
        },
        "handlers": {
            "default": {
                "class": "logging.StreamHandler",
                "formatter": "pywebflowFormatter",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "pywebflow": {"handlers": ["default"], "level": "INFO"},
            "uvicorn.error": {"handlers": ["default"], "level": "INFO"},
            "uvicorn.access": {
                "handlers": ["default"],
                "level": "INFO",
                "propagate": False,
            },
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


if __name__ == "__main__":
    launch()