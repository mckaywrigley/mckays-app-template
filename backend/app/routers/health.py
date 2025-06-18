from fastapi import APIRouter
import datetime
from occ_setup import HAS_OCC

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint for Docker healthcheck"""
    occ_status = "available" if HAS_OCC else "unavailable"
    return {
        "status": "healthy",
        "time": datetime.datetime.now().isoformat(),
        "occ_status": occ_status,
    }
