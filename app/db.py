from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
Base = declarative_base()
from app.models.addresses import Address
from app.models.categories import Category
from app.models.manufacturers import Manufacturer
from app.models.products import Product


DB_URL = "postgresql://postgres:2525@localhost:5432/shop"

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
