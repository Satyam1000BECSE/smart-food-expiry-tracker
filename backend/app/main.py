from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import analytics
from app.routes import auth, product, websocket
from app.routes import admin
from app.routes import ocr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://smart-food-expiry-tracker-zeta.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(product.router)
app.include_router(websocket.router)
app.include_router(analytics.router)
app.include_router(admin.router)
app.include_router(ocr.router)




