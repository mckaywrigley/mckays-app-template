import os
import uuid
from typing import Optional
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
STEP_FILES_BUCKET = "step_files"

if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        HAS_SUPABASE = True
    except Exception as e:  # pragma: no cover - environment specific
        print(f"Error initializing Supabase client: {e}")
        supabase = None
        HAS_SUPABASE = False
else:
    print(
        "Supabase credentials not found. Set SUPABASE_URL and SUPABASE_KEY environment variables."
    )
    supabase = None
    HAS_SUPABASE = False


def check_storage_bucket() -> bool:
    if not supabase:
        return False
    try:
        buckets = supabase.storage.list_buckets()
        return any(b["name"] == STEP_FILES_BUCKET for b in buckets)
    except Exception:
        return False


STORAGE_READY = check_storage_bucket()


def upload_to_supabase_storage(file_path: str, file_name: Optional[str] = None):
    if not supabase:
        return {"success": False, "error": "Supabase client not initialized"}

    file_name = file_name or os.path.basename(file_path)
    unique_path = f"{uuid.uuid4()}/{file_name}"
    with open(file_path, "rb") as f:
        file_data = f.read()
    try:
        supabase.storage.from_(STEP_FILES_BUCKET).upload(
            unique_path, file_data, {"content-type": "application/step"}
        )
        file_url = supabase.storage.from_(STEP_FILES_BUCKET).get_public_url(unique_path)
        return {"success": True, "path": unique_path, "url": file_url, "size": len(file_data)}
    except Exception as e:  # pragma: no cover - network side effects
        print(f"Error uploading to Supabase storage: {e}")
        return {"success": False, "error": str(e)}


def download_from_supabase_storage(file_path: str):
    if not supabase:
        return {"success": False, "error": "Supabase client not initialized"}
    try:
        result = supabase.storage.from_(STEP_FILES_BUCKET).download(file_path)
        return {"success": True, "data": result}
    except Exception as e:  # pragma: no cover - network side effects
        print(f"Error downloading from Supabase storage: {e}")
        return {"success": False, "error": str(e)}
