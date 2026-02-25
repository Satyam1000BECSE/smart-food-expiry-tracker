from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserLogin
from app.services.auth_service import register_user, login_user
from app.utils.dependencies import get_db

router = APIRouter(prefix="/auth")

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = login_user(db, user)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    return {"access_token": token}
