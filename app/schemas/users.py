from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    firstname: str
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

class UserResponse(BaseModel):
    access_token: str
    token_type: str
    user: User