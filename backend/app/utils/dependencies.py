from fastapi import Depends, HTTPException
from jose import jwt
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.config import SECRET_KEY, ALGORITHM
from app.models.user import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(User).filter(User.id == payload["user_id"]).first()
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid Token")
    
def admin_required(current_user):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin Only")

