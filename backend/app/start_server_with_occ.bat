@echo off
echo ===================================
echo Starting FastAPI server with OpenCascade support
echo ===================================

:: Activate conda environment
call C:\Users\Hp\Miniconda\Scripts\activate.bat occ-env

:: Skip dependency installation to avoid pip errors
echo Skipping package installation - using existing environment...

:: Start the server without auto-reload for faster performance
echo Starting FastAPI server (without auto-reload for faster performance)...
uvicorn main:app --host 0.0.0.0 --port 8000

pause
