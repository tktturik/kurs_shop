from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    surname: str
    role: str = "user" 
    avatar: Optional[str] = None 
    email: str
    password: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

class UserLogin(BaseModel):
    email: str
    password:str
    
