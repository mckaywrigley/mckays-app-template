# Utility functions for STEP file processing
import numpy as np
from typing import Dict, Any
from occ_setup import (
    HAS_OCC,
    read_step_file,
    brepgprop,
    GProp_GProps,
    TopExp_Explorer,
    TopAbs_FACE,
    TopAbs_EDGE,
    TopAbs_VERTEX,
    Bnd_Box,
    brepbndlib_Add,
)


def mock_process_step_file(file_path: str):
    """Simulate processing a STEP file and extracting geometry."""
    volume = np.random.uniform(200, 1200)
    surface_area = 6 * (volume ** (2 / 3))
    features = {
        "holes": np.random.randint(1, 10),
        "pockets": np.random.randint(1, 5),
        "threads": np.random.randint(0, 6),
    }
    return volume, surface_area, features


def process_step_file(file_path: str) -> Dict[str, Any]:
    """Process a STEP file using OpenCascade if available."""
    if not HAS_OCC:
        return mock_process_step_file(file_path)
    try:
        shape = read_step_file(file_path)
        if not shape:
            raise Exception("Failed to read STEP file")
        props = GProp_GProps()
        brepgprop.VolumeProperties(shape, props)
        volume = props.Mass()
        brepgprop.SurfaceProperties(shape, props)
        surface_area = props.Mass()
        face_explorer = TopExp_Explorer(shape, TopAbs_FACE)
        face_count = 0
        while face_explorer.More():
            face_count += 1
            face_explorer.Next()
        edge_explorer = TopExp_Explorer(shape, TopAbs_EDGE)
        edge_count = 0
        while edge_explorer.More():
            edge_count += 1
            edge_explorer.Next()
        vertex_explorer = TopExp_Explorer(shape, TopAbs_VERTEX)
        vertex_count = 0
        while vertex_explorer.More():
            vertex_count += 1
            vertex_explorer.Next()
        bbox = Bnd_Box()
        brepbndlib_Add(shape, bbox)
        xmin, ymin, zmin, xmax, ymax, zmax = bbox.Get()
        width = xmax - xmin
        height = ymax - ymin
        depth = zmax - zmin
        holes = max(1, int(edge_count / 12))
        pockets = max(1, int(face_count / 8))
        threads = max(0, int(edge_count / 20))
        return {
            "volume": round(volume, 2),
            "surface_area": round(surface_area, 2),
            "dimensions": {
                "width": round(width, 2),
                "height": round(height, 2),
                "depth": round(depth, 2),
            },
            "features": {
                "holes": holes,
                "pockets": pockets,
                "threads": threads,
            },
            "topology": {
                "faces": face_count,
                "edges": edge_count,
                "vertices": vertex_count,
            },
        }
    except Exception as e:
        print(f"Error processing STEP file with OpenCascade: {e}")
        return mock_process_step_file(file_path)


def calculate_machining_time(operations, features) -> float:
    """Calculate estimated machining time based on operations and features."""
    total_time = 0.0
    for operation in operations:
        if operation == "Turning":
            total_time += 1.5
        elif operation == "Milling":
            total_time += 2.0
        elif operation == "Drilling":
            total_time += 0.2 * features["holes"]
        elif operation == "Tapping":
            total_time += 0.3 * features["threads"]
        elif operation == "Boring":
            total_time += 1.0
        else:
            total_time += 1.0
    complexity = 1.0 + (0.1 * (features["holes"] + features["pockets"] + features["threads"]) / 10)
    return total_time * complexity
