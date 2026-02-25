from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.dependencies import get_db
from app.services.analytics_service import get_dashboard_stats

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return get_dashboard_stats(db, user_id=1)
