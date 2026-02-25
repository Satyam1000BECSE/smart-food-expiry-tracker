from pydantic import BaseModel
from datetime import date

class ProductCreate(BaseModel):
    name: str
    category: str
    quantity: int
    unit: str
    expiry_date: date

class ProductResponse(ProductCreate):
    id: int
    days_left: int
    status: str

    class Config:
        from_attributes = True


