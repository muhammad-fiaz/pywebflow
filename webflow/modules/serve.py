import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from webflow.modules import WebFlow
from webflow.modules.mount import mount_static_files

app = WebFlow.app



