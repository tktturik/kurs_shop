from sqlalchemy import Column, Integer, String, ForeignKey
from app.db import Base
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    categoryname = Column(String, index=True)
    description = Column(String, index=True)
    parentcategoryid = Column(Integer, ForeignKey('categories.id'), nullable=True)
    
    products = relationship("Product", back_populates="category")
    parent = relationship("Category", remote_side=[id])