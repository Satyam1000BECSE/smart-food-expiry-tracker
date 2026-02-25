from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)
    message = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
