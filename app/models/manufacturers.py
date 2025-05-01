from sqlalchemy import Column, Integer, String, ForeignKey
from db import Base
from sqlalchemy.orm import relationship

class Manufacturer(Base):
    __tablename__ = "manufacturers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    contactinfo = Column(String, index=True)
    address = Column(Integer, ForeignKey('addresses.id'))
    
    products = relationship("Product", back_populates="manufacturer")
