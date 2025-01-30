# nodeflow/modules/mount.py
from fastapi import FastAPI
from starlette.staticfiles import StaticFiles


def mount_static_files(app: FastAPI):
    """
    Mount the static files (like React build files) into the FastAPI app.

    :param app: The FastAPI application instance
    """
    app.mount("/", StaticFiles(directory="packages/frontend/dist", html=True), name="static")
