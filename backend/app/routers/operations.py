from fastapi import APIRouter
from materials import machining_operations

router = APIRouter()


@router.get("/operations/")
async def get_operations():
    """Get the list of available machining operations and their costs."""
    return machining_operations
