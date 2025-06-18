# Material and machining operation data and helper utilities
from typing import List, Tuple

# Load material data from CSV file or in-memory definitions
materials_data = [
    {"type": "Steel", "grade": "Carbon Steel (A36)", "density": 7.85, "cost_per_kg": [45, 100]},
    {"type": "Steel", "grade": "Alloy Steel (4140)", "density": 7.85, "cost_per_kg": [120, 300]},
    {"type": "Steel", "grade": "Stainless Steel (304)", "density": 7.9, "cost_per_kg": [220, 450]},
    {"type": "Steel", "grade": "Stainless Steel (316)", "density": 7.98, "cost_per_kg": [300, 600]},
    {"type": "Steel", "grade": "Tool Steel (O1)", "density": 7.85, "cost_per_kg": [450, 900]},
    {"type": "Steel", "grade": "High-Speed Steel (M2)", "density": 8.1, "cost_per_kg": [1000, 1800]},
    {"type": "Aluminum", "grade": "6061", "density": 2.7, "cost_per_kg": [250, 400]},
    {"type": "Aluminum", "grade": "7075", "density": 2.8, "cost_per_kg": [700, 1200]},
    {"type": "Aluminum", "grade": "2024", "density": 2.78, "cost_per_kg": [800, 1600]},
]

# Load machining operations data
machining_operations = [
    {"name": "Turning", "cost_per_hour": [300, 1500]},
    {"name": "Milling", "cost_per_hour": [400, 2500]},
    {"name": "Drilling", "cost_per_hour": [200, 1500]},
    {"name": "Grinding", "cost_per_hour": [500, 2000]},
    {"name": "Boring", "cost_per_hour": [400, 2000]},
    {"name": "Tapping", "cost_per_hour": [300, 1500]},
    {"name": "Electrical Discharge Machining (EDM)", "cost_per_hour": [1500, 6000]},
    {"name": "Laser Cutting", "cost_per_hour": [1000, 4000]},
    {"name": "Plasma Cutting", "cost_per_hour": [800, 2500]},
]


def get_material_properties(material_type: str, material_grade: str) -> Tuple[float, List[int]]:
    """Return density and cost range for the given material."""
    for material in materials_data:
        if material["type"] == material_type and material["grade"] == material_grade:
            return material["density"], material["cost_per_kg"]
    return 7.85, [100, 300]


def get_operation_cost(operation_name: str) -> float:
    """Return the average cost per hour for a machining operation."""
    for operation in machining_operations:
        if operation["name"] == operation_name:
            cost_range = operation["cost_per_hour"]
            return sum(cost_range) / 2
    return 1000.0
