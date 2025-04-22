from fastapi import FastAPI
from app.models.users import User
from app.db import engine
from app.routers import users
from fastapi.middleware.cors import CORSMiddleware


User.metadata.create_all(bind=engine)


app = FastAPI()
origins = [
    "http://localhost/tiangolo.com",
    "https://localhost/tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:59669",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://195.133.194.105"

]
# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Разрешить запросы от фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)