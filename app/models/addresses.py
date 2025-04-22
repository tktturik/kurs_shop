
from sqlalchemy import Column, Integer, String
from app.db import Base

class Address(Base):
    __tablename__ = "addresses"
    
    id = Column(Integer, primary_key=True, index=True)
    street = Column(String)
    housenumber = Column(String)
    additionalinfo = Column(String)