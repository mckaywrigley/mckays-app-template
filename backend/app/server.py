from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routers.files import router as files_router
from routers.webhook import router as webhook_router
from routers.materials import router as materials_router
from routers.operations import router as operations_router
from routers.health import router as health_router
from convert_step_endpoint import router as convert_step_router

app = FastAPI(title="Torkline Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Register routers
app.include_router(files_router, prefix="/api/files", tags=["files"])
app.include_router(webhook_router, prefix="/api/webhook", tags=["webhook"])
app.include_router(materials_router, prefix="/api/materials", tags=["materials"])
app.include_router(operations_router, prefix="/api/operations", tags=["operations"])
app.include_router(health_router, prefix="/api/health", tags=["health"])
app.include_router(convert_step_router, tags=["convert-step"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 