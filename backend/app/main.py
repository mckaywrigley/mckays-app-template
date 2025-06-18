import os
import tempfile
import uuid
import datetime
import traceback
from typing import List, Optional, Dict, Any, Union
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, Header, Body, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from materials import (
    materials_data,
    machining_operations,
    get_material_properties,
    get_operation_cost,
)
from models import (
    MachiningOperation,
    FeatureDetectionResult,
    GeometryDetails,
    CostCalculation,
    ProcessingResponse,
    QuoteRequest,
    QuoteResponse,
    SupabaseStorageFile,
    SupabaseWebhookPayload,
)
import numpy as np
import json
import requests
from supabase_utils import (
    supabase,
    HAS_SUPABASE,
    STORAGE_READY,
    upload_to_supabase_storage,
    download_from_supabase_storage,
    STEP_FILES_BUCKET,
)
from occ_setup import (
    HAS_OCC,
    read_step_file,
    write_stl_file,
    brepgprop,
    GProp_GProps,
    BRepAlgoAPI_Fuse,
    BRepBuilderAPI_MakeShape,
    BRepExtrema_DistShapeShape,
    BRep_Tool,
    TopAbs_FACE,
    TopAbs_EDGE,
    TopAbs_VERTEX,
    TopExp_Explorer,
    topods_Face,
    topods_Edge,
    topods_Vertex,
    TopLoc_Location,
    gp_Pnt,
    Bnd_Box,
    brepbndlib_Add,
    define_mock_occ_functions,
)



from routers.files import router as files_router
from routers.webhook import router as webhook_router
from routers.materials import router as materials_router
from routers.operations import router as operations_router
from routers.health import router as health_router

app = FastAPI(title="STEP File Processing Service")
# Enable CORS
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

# Include the routers
app.include_router(files_router, prefix="/api/files", tags=["files"])
app.include_router(webhook_router, prefix="/api/webhook", tags=["webhook"])
app.include_router(materials_router, prefix="/api/materials", tags=["materials"])
app.include_router(operations_router, prefix="/api/operations", tags=["operations"])
app.include_router(health_router, prefix="/api/health", tags=["health"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
