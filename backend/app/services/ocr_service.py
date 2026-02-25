import pytesseract
from PIL import Image

# 🔥 Windows path set here (VERY IMPORTANT)
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\hp\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"
def extract_text(image_path):
    return pytesseract.image_to_string(Image.open(image_path))
