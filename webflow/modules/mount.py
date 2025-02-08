# nodeflow/modules/mount.py
import os
from fastapi import FastAPI
from starlette.staticfiles import StaticFiles


def mount_static_files(app: FastAPI):
    """
    Mount the static files (like React build files) into the FastAPI app.

    :param app: The FastAPI application instance
    """
    static_dir = "packages/frontend/dist"
    if os.path.isdir(static_dir):
        app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
    else:
        print(
            f"Warning: Static directory '{static_dir}' not found. Skipping mounting of static files."
        )
