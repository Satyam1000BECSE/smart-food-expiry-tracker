from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"}  # 🔥 Important for Render
)

SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base = declarative_base()
