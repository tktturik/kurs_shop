from sqlalchemy import Column, Integer, String
from app.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, index=True)
    role = Column(String, index=True)
    avatar = Column(String, index=True, nullable=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True) 