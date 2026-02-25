from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.dependencies import get_db
from app.models.user import User

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users")
def all_users(db: Session = Depends(get_db)):
    return db.query(User).all()
