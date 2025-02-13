import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from webflow.modules import WebFlow
from webflow.modules.mount import mount_static_files

app = WebFlow.app

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mount_static_files(app)