from fastapi import APIRouter
from materials import materials_data

router = APIRouter()


@router.get("/materials/")
async def get_materials():
    """Get the list of available materials and their properties."""
    return materials_data
