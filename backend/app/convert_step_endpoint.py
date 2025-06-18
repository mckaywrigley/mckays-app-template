from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import tempfile
import os
import base64
import requests
import traceback

router = APIRouter()

@router.options("/convert-step-to-stl")
async def options_handler():
    # Handle CORS preflight requests
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    )

def convert_step_file_to_stl(step_file_path):
    """
    Convert a STEP file to STL format using OpenCascade.
    Returns the path to the generated STL file.
    """
    try:
        # Import OpenCascade libraries
        from OCC.Core.STEPControl import STEPControl_Reader
        from OCC.Core.IFSelect import IFSelect_RetDone
        from OCC.Core.StlAPI import StlAPI_Writer
        from OCC.Core.TopoDS import TopoDS_Shape
        from OCC.Core.BRepMesh import BRepMesh_IncrementalMesh
        from OCC.Core.Bnd import Bnd_Box
        from OCC.Core.BRepBndLib import brepbndlib_Add
        
        print("OCC processing started - using enhanced mesh settings")
        
        # Create a STEP reader
        step_reader = STEPControl_Reader()
        
        # Read the STEP file
        status = step_reader.ReadFile(step_file_path)
        
        if status != IFSelect_RetDone:
            raise Exception(f"Error reading STEP file. Status code: {status}")
        
        # Transfer to shape
        step_reader.TransferRoot()
        shape = step_reader.Shape()
        
        # Calculate model size to set appropriate mesh resolution
        bbox = Bnd_Box()
        brepbndlib_Add(shape, bbox)
        xmin, ymin, zmin, xmax, ymax, zmax = bbox.Get()
        diagonal = ((xmax-xmin)**2 + (ymax-ymin)**2 + (zmax-zmin)**2)**0.5
        
        # Higher quality mesh parameters for smoother appearance
        linear_deflection = min(diagonal * 0.002, 0.1)  # 0.2% of model size or max 0.1mm
        angular_deflection = 0.1  # in radians (about 5.7 degrees)
        
        print(f"Creating enhanced mesh with linear deflection: {linear_deflection}")
        
        # Create a higher quality mesh
        mesh = BRepMesh_IncrementalMesh(shape, linear_deflection, False, angular_deflection, True)
        mesh.Perform()
        
        if not mesh.IsDone():
            print("Warning: Mesh not complete")
            
        # Create a STL writer
        stl_writer = StlAPI_Writer()
        stl_writer.SetASCIIMode(False)  # Use binary STL format for better compatibility
        
        # Create a temporary file for the STL
        stl_file = tempfile.NamedTemporaryFile(suffix=".stl", delete=False)
        stl_file_path = stl_file.name
        stl_file.close()
        
        # Write the shape to STL file
        stl_writer.Write(shape, stl_file_path)
        
        print(f"STL file saved to: {stl_file_path}")
        return stl_file_path
    except Exception as e:
        print(f"Error converting STEP to STL: {str(e)}")
        traceback.print_exc()
        raise e

@router.post("/convert-step-to-stl")
async def convert_step_from_url(request: Request):
    try:
        # Parse the request body
        body = await request.json()
        url = body.get("url") or body.get("step_file_url")
        file_name = body.get("file_name")
        
        if not url:
            raise HTTPException(status_code=400, detail="URL is required")
        
        # Download the STEP file
        print(f"Downloading STEP file from: {url}")
        response = requests.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Failed to download STEP file: HTTP {response.status_code}")
        
        # Save to temporary file - Create a proper temp file that will be auto-closed
        temp_step_file = tempfile.NamedTemporaryFile(suffix=".step", delete=False)
        try:
            # Write directly to the temp file
            temp_step_file.write(response.content)
            temp_step_file.flush()  # Ensure all data is written
            temp_step_file.close()  # Explicitly close to avoid file handle issues
        except Exception as e:
            print(f"Error writing temp file: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error preparing file: {str(e)}")
        
        print(f"STEP file saved to: {temp_step_file.name}")
        
        # Convert STEP to STL
        stl_file_path = convert_step_file_to_stl(temp_step_file.name)
        print(f"STL file saved to: {stl_file_path}")
        
        # Read the STL file as binary data
        with open(stl_file_path, "rb") as f:
            stl_data = f.read()
        
        # Encode as base64
        stl_base64 = base64.b64encode(stl_data).decode('utf-8')
        
        # Create response data
        response_data = {
            "stl_data": f"data:model/stl;base64,{stl_base64}",
            "file_name": file_name or os.path.basename(url)
        }
        
        # Return JSONResponse with CORS headers
        return JSONResponse(
            content=response_data,
            headers={
                "Access-Control-Allow-Origin": "*",  # Allow all origins for testing
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error converting file: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error converting file: {str(e)}")
    finally:
        # Clean up temp files safely with retries
        def safe_delete(file_path):
            if not file_path or not os.path.exists(file_path):
                return
            try:
                os.unlink(file_path)
                print(f"Successfully deleted temp file: {file_path}")
            except Exception as e:
                print(f"Warning: Could not delete temp file {file_path}: {str(e)}")
                # Instead of failing, just log the error. The OS will clean up temp files eventually.
                # We could implement a retry mechanism here if needed.
        
        # Try to clean up the temp files, but don't crash if they're still in use
        if 'temp_step_file' in locals() and temp_step_file:
            safe_delete(temp_step_file.name)
        if 'stl_file_path' in locals() and stl_file_path:
            safe_delete(stl_file_path)
