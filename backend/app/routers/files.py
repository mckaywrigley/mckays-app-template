from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import os
import json
import tempfile
import datetime
import numpy as np
from materials import (
    machining_operations,
    get_material_properties,
    get_operation_cost,
)
from models import (
    GeometryDetails,
    FeatureDetectionResult,
    CostCalculation,
    ProcessingResponse,
)
from supabase_utils import (
    supabase,
    HAS_SUPABASE,
    STORAGE_READY,
    upload_to_supabase_storage,
    download_from_supabase_storage,
    STEP_FILES_BUCKET,
)
from processing_utils import (
    process_step_file,
    mock_process_step_file,
    calculate_machining_time,
)

router = APIRouter()


@router.post("/upload", response_model=ProcessingResponse)
async def upload_step_file(
    file: UploadFile = File(...),
    material_type: str = Form(...),
    material_grade: str = Form(...),
    operations: str = Form(...),
    use_supabase: bool = Form(False),
):
    try:
        operations_list = json.loads(operations)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid operations format")

    valid_operation_names = [op["name"] for op in machining_operations]
    for operation in operations_list:
        if operation not in valid_operation_names:
            raise HTTPException(status_code=400, detail=f"Invalid operation: {operation}")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".stp") as temp:
        temp.write(await file.read())
        temp_file_path = temp.name

    try:
        result = process_step_file(temp_file_path) if HAS_SUPABASE or True else mock_process_step_file(temp_file_path)
        material_props = get_material_properties(material_type, material_grade)
        if not material_props:
            raise HTTPException(status_code=400, detail=f"Unknown material: {material_type} {material_grade}")
        weight = result["volume"] * material_props["density"] / 1000
        material_cost = weight * np.mean(material_props["cost_per_kg"])
        machining_time = calculate_machining_time(operations_list, result["features"])
        machining_cost = 0
        for op in operations_list:
            op_cost = get_operation_cost(op)
            machining_cost += (op_cost * machining_time / len(operations_list))
        geometry = GeometryDetails(volume=result["volume"], surface_area=result["surface_area"], weight=weight)
        features = FeatureDetectionResult(
            holes=result["features"]["holes"],
            pockets=result["features"]["pockets"],
            threads=result["features"]["threads"],
        )
        costs = CostCalculation(
            material_cost=material_cost,
            machining_time=machining_time,
            machining_cost=machining_cost,
            total_cost=material_cost + machining_cost,
        )
        file_url = None
        if use_supabase and HAS_SUPABASE and STORAGE_READY:
            upload_result = upload_to_supabase_storage(temp_file_path, file.filename)
            if upload_result["success"]:
                file_url = upload_result["url"]
                metadata = {
                    "file_path": upload_result["path"],
                    "file_name": file.filename,
                    "material_type": material_type,
                    "material_grade": material_grade,
                    "operations": operations_list,
                    "geometry": {
                        "volume": result["volume"],
                        "surface_area": result["surface_area"],
                        "weight": weight,
                    },
                    "features": {
                        "holes": result["features"]["holes"],
                        "pockets": result["features"]["pockets"],
                        "threads": result["features"]["threads"],
                    },
                    "costs": {
                        "material_cost": material_cost,
                        "machining_time": machining_time,
                        "machining_cost": machining_cost,
                        "total_cost": material_cost + machining_cost,
                    },
                    "created_at": str(datetime.datetime.now()),
                }
                if HAS_SUPABASE:
                    try:
                        supabase.table("step_file_processing").insert(metadata).execute()
                    except Exception as e:
                        print(f"Error storing metadata: {e}")
        os.unlink(temp_file_path)
        return ProcessingResponse(geometry=geometry, features=features, costs=costs, file_url=file_url)
    except Exception as e:
        if os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/process-supabase-file", response_model=ProcessingResponse)
async def process_supabase_file(
    file_path: str = Form(...),
    material_type: str = Form(...),
    material_grade: str = Form(...),
    operations: str = Form(...),
):
    if not HAS_SUPABASE or not STORAGE_READY:
        raise HTTPException(status_code=503, detail="Supabase storage integration not available")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".stp") as temp_file:
        temp_path = temp_file.name

    try:
        result = download_from_supabase_storage(file_path)
        if not result["success"]:
            raise HTTPException(status_code=404, detail=f"Failed to download file from storage: {result.get('error')}")
        with open(temp_path, "wb") as f:
            f.write(result["data"])
        processing_result = process_step_file(temp_path) if HAS_SUPABASE or True else mock_process_step_file(temp_path)
        try:
            operations_list = json.loads(operations)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid operations JSON format")
        material_props = get_material_properties(material_type, material_grade)
        if not material_props:
            raise HTTPException(status_code=400, detail=f"Unknown material: {material_type} {material_grade}")
        weight = processing_result["volume"] * material_props["density"] / 1000
        material_cost = weight * np.mean(material_props["cost_per_kg"])
        machining_time = calculate_machining_time(operations_list, processing_result["features"])
        machining_cost = 0
        for op in operations_list:
            op_cost = get_operation_cost(op)
            machining_cost += (op_cost * machining_time / len(operations_list))
        geometry = GeometryDetails(
            volume=processing_result["volume"],
            surface_area=processing_result["surface_area"],
            weight=weight,
        )
        features = FeatureDetectionResult(
            holes=processing_result["features"]["holes"],
            pockets=processing_result["features"]["pockets"],
            threads=processing_result["features"]["threads"],
        )
        costs = CostCalculation(
            material_cost=material_cost,
            machining_time=machining_time,
            machining_cost=machining_cost,
            total_cost=material_cost + machining_cost,
        )
        file_url = None
        try:
            file_url = supabase.storage.from_(STEP_FILES_BUCKET).get_public_url(file_path)
        except Exception as url_error:
            print(f"Error getting public URL: {url_error}")
        processing_metadata = {
            "file_path": file_path,
            "material_type": material_type,
            "material_grade": material_grade,
            "operations": operations_list,
            "geometry": {
                "volume": processing_result["volume"],
                "surface_area": processing_result["surface_area"],
                "weight": weight,
            },
            "features": processing_result["features"],
            "costs": {
                "material_cost": material_cost,
                "machining_time": machining_time,
                "machining_cost": machining_cost,
                "total_cost": material_cost + machining_cost,
            },
            "processed_at": str(datetime.datetime.now()),
        }
        if HAS_SUPABASE:
            try:
                existing = supabase.table("step_file_processing").select("*").eq("file_path", file_path).execute()
                if existing.data and len(existing.data) > 0:
                    supabase.table("step_file_processing").update(processing_metadata).eq("file_path", file_path).execute()
                else:
                    supabase.table("step_file_processing").insert(processing_metadata).execute()
            except Exception as db_error:
                print(f"Error storing processing metadata: {db_error}")
        if os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception as cleanup_error:
                print(f"Error cleaning up temp file: {cleanup_error}")
        return ProcessingResponse(geometry=geometry, features=features, costs=costs, file_url=file_url)
    except Exception as e:
        if os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception as cleanup_error:
                print(f"Error cleaning up temp file: {cleanup_error}")
        raise HTTPException(status_code=500, detail=f"Error processing Supabase file: {e}")
