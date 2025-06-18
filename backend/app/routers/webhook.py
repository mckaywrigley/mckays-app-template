from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import os
import tempfile
import datetime
import numpy as np
from supabase_utils import download_from_supabase_storage, supabase, HAS_SUPABASE, STEP_FILES_BUCKET
from processing_utils import process_step_file, mock_process_step_file, calculate_machining_time
from materials import get_material_properties, get_operation_cost

router = APIRouter()


@router.post("/supabase-webhook/")
async def handle_supabase_webhook(request: Request):
    try:
        payload = await request.json()
        print(f"Received Supabase webhook event: {payload}")
        webhook_secret = os.environ.get("SUPABASE_WEBHOOK_SECRET")
        if webhook_secret:
            signature = request.headers.get("X-Webhook-Secret")
            if signature != webhook_secret:
                raise HTTPException(status_code=401, detail="Unauthorized webhook request")
        if payload.get("type") == "INSERT" and payload.get("table") == "storage.objects":
            file_data = payload.get("record", {})
            bucket_id = file_data.get("bucket_id")
            if bucket_id == STEP_FILES_BUCKET:
                file_path = file_data.get("path")
                if not file_path:
                    return JSONResponse({"status": "error", "message": "No file path in webhook data"})
                with tempfile.NamedTemporaryFile(delete=False, suffix=".stp") as temp_file:
                    temp_path = temp_file.name
                try:
                    result = download_from_supabase_storage(file_path)
                    if not result["success"]:
                        raise Exception(f"Failed to download file: {result.get('error')}")
                    with open(temp_path, "wb") as f:
                        f.write(result["data"])
                    processing_result = process_step_file(temp_path) if HAS_SUPABASE or True else mock_process_step_file(temp_path)
                    processing_metadata = None
                    if file_data.get("id"):
                        try:
                            metadata_response = supabase.table("step_file_processing").select("*").eq("file_path", file_path).execute()
                            if metadata_response.data and len(metadata_response.data) > 0:
                                processing_metadata = metadata_response.data[0]
                        except Exception as metadata_error:
                            print(f"Error fetching metadata: {metadata_error}")
                    if processing_metadata and processing_metadata.get("material_type") and processing_metadata.get("material_grade") and processing_metadata.get("operations"):
                        material_type = processing_metadata["material_type"]
                        material_grade = processing_metadata["material_grade"]
                        operations_list = processing_metadata["operations"]
                        material_props = get_material_properties(material_type, material_grade)
                        if material_props:
                            weight = processing_result["volume"] * material_props["density"] / 1000
                            material_cost = weight * np.mean(material_props["cost_per_kg"])
                            machining_time = calculate_machining_time(operations_list, processing_result["features"])
                            machining_cost = 0
                            for op in operations_list:
                                op_cost = get_operation_cost(op)
                                machining_cost += (op_cost * machining_time / len(operations_list))
                            result_data = {
                                "processing_complete": True,
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
                            try:
                                supabase.table("step_file_processing").update(result_data).eq("file_path", file_path).execute()
                                print(f"Updated processing results for file: {file_path}")
                            except Exception as update_error:
                                print(f"Error updating processing results: {update_error}")
                    return JSONResponse({"status": "success", "message": "File processed successfully", "file_path": file_path})
                except Exception as e:
                    print(f"Error processing file from webhook: {e}")
                    return JSONResponse({"status": "error", "message": f"Error processing file: {e}"})
                finally:
                    if os.path.exists(temp_path):
                        try:
                            os.unlink(temp_path)
                        except Exception as cleanup_error:
                            print(f"Error cleaning up temp file: {cleanup_error}")
        elif payload.get("type") == "process_step_file" and payload.get("file_path"):
            file_path = payload.get("file_path")
            return JSONResponse({"status": "success", "message": "Custom processing request handled"})
        return JSONResponse({"status": "success", "message": "Webhook received but no action taken"})
    except Exception as e:
        print(f"Error in webhook handler: {e}")
        return JSONResponse({"status": "error", "message": f"Webhook handler error: {e}"})
