from sqlalchemy import Column, Integer, String, Float, Boolean,ForeignKey  
from app.db import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    image = Column(String, index=True)
    quantity = Column(Integer, index=True)
    price = Column(Float, index=True)
    categoryid = Column(Integer, ForeignKey("categories.id"))
    manufacturerid = Column(Integer, ForeignKey("manufacturers.id"))

    category = relationship("Category", back_populates="products")
    manufacturer = relationship("Manufacturer", back_populates="products")
    
    
