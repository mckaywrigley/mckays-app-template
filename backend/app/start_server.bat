@echo off
echo Starting FastAPI server with OpenCascade support...
call C:\Users\Hp\Miniconda\Scripts\activate.bat occ-env
pip install fastapi uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause
