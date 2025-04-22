from fastapi import FastAPI
from app.models.users import User
from app.models.products import Product
from app.models.categories import Category
from app.models.manufacturers import Manufacturer
from app.models.addresses import Address
from app.db import engine
from app.routers import users
from app.routers import products
from app.routers import categories
from app.routers import manufacturers
from app.routers import addresses

User.metadata.create_all(bind=engine)
Product.metadata.create_all(bind=engine)
Category.metadata.create_all(bind=engine)
Manufacturer.metadata.create_all(bind=engine)
Address.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(users.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(manufacturers.router)
app.include_router(addresses.router)