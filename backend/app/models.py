from typing import List, Optional
from pydantic import BaseModel

class MaterialInfo(BaseModel):
    type: str
    grade: str

class MachiningOperation(BaseModel):
    name: str

class FeatureDetectionResult(BaseModel):
    holes: int
    pockets: int
    threads: int

class GeometryDetails(BaseModel):
    volume: float
    surface_area: float
    weight: float

class CostCalculation(BaseModel):
    material_cost: float
    machining_time: float
    machining_cost: float
    total_cost: float

class ProcessingResponse(BaseModel):
    geometry: GeometryDetails
    features: FeatureDetectionResult
    costs: CostCalculation
    file_url: Optional[str] = None

class QuoteRequest(BaseModel):
    material_info: MaterialInfo
    operations: List[str]
    quantity: int
    geometry: Optional[GeometryDetails] = None
    features: Optional[FeatureDetectionResult] = None

class QuoteResponse(BaseModel):
    quote_id: str
    material_info: MaterialInfo
    operations: List[str]
    quantity: int
    unit_cost: float
    total_cost: float
    lead_time_days: int

class SupabaseStorageFile(BaseModel):
    path: str
    material_type: str
    material_grade: str
    operations: List[str]

class SupabaseWebhookPayload(BaseModel):
    event: str
    file_path: str
    record_id: Optional[str] = None
    metadata: Optional[dict] = None
