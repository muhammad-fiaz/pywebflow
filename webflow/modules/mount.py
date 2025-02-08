import os
from fastapi import FastAPI
from starlette.staticfiles import StaticFiles


def mount_static_files(app: FastAPI):
    """
    Mount the static files (like React build files) into the FastAPI app.

    The static directory is determined relative to this file's location.
    Expected structure:
      webflow/
      ├── modules/
      │   └── mount.py
      └── frontend/
          └── dist/     <-- React build output

    :param app: The FastAPI application instance
    """
    # Get the directory of this file (i.e. webflow/modules)
    modules_dir = os.path.dirname(os.path.abspath(__file__))
    # The project root is the parent of modules (i.e. webflow)
    project_root = os.path.dirname(modules_dir)
    # Build the absolute path to the frontend dist folder
    static_dir = os.path.join(project_root, "frontend", "dist")

    if os.path.isdir(static_dir):
        app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
    else:
        print(
            f"Warning: Static directory '{static_dir}' not found. Skipping mounting of static files."
        )
