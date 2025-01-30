# nodeflow/modules/serve.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from webflow.modules.mount import mount_static_files
from webflow.modules.arguments import parse_arguments
from webflow.modules.routes import router


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

mount_static_files(app)
