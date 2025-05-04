from pydantic import BaseModel
from typing import Optional, List

class CategoryBase(BaseModel):
    categoryname: str
    description: Optional[str] = None
    parentcategoryid: Optional[int] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryName(BaseModel):
    categoryname: str

class Category(CategoryBase):
    id: int
    
    class Config:
        orm_mode = True
        from_attributes = True 