from fastapi import FastAPI
from models.users import User
from models.products import Product
from models.categories import Category
from models.manufacturers import Manufacturer
from models.addresses import Address
from db import engine
from routers import users
from routers import products
from routers import categories
from routers import manufacturers
from routers import addresses
from fastapi.middleware.cors import CORSMiddleware


User.metadata.create_all(bind=engine)
Product.metadata.create_all(bind=engine)
Category.metadata.create_all(bind=engine)
Manufacturer.metadata.create_all(bind=engine)
Address.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:5173", 
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://195.133.194.105",
    "http://sosiskaviord.duckdns.org",
    "https://sosiskaviord.duckdns.org"
]





app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],    
)
app.include_router(users.router,prefix="/api")
app.include_router(products.router,prefix="/api")
app.include_router(categories.router,prefix="/api")
app.include_router(manufacturers.router,prefix="/api")
app.include_router(addresses.router,prefix="/api")