from sqlalchemy import Column, Integer, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String, nullable=False)
    expiry_date = Column(Date, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    is_wasted = Column(Boolean, default=False)
    owner = relationship("User")


