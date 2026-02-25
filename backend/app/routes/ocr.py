from fastapi import APIRouter, UploadFile, File
from app.services.ocr_service import extract_text
import shutil
import os

router = APIRouter(prefix="/ocr")

@router.post("/")
async def upload_image(file: UploadFile = File(...)):

    upload_path = f"temp_{file.filename}"

    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(upload_path)

    os.remove(upload_path)

    return {"extracted_text": text}
