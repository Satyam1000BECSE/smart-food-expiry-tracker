from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.product_schema import ProductCreate
from app.services.product_service import create_product, search_products
from app.services.waste_service import mark_as_wasted
from app.utils.dependencies import get_db

router = APIRouter(prefix="/products")


# ✅ ADD PRODUCT
@router.post("/")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product, user_id=1)


# ✅ GET + FILTER PRODUCTS (Single Route)
@router.get("/")
def fetch_products(
    name: str = None,
    category: str = None,
    db: Session = Depends(get_db)
):
    return search_products(
        db,
        user_id=1,
        name=name,
        category=category
    )


# ✅ MARK AS WASTED
@router.put("/{product_id}/waste")
def waste(product_id: int, db: Session = Depends(get_db)):
    return mark_as_wasted(db, product_id, user_id=1)


