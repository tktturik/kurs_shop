
from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: str
    image: Optional[str] = None
    quantity: int
    price: float
    categoryid: int = 1
    manufacturerid: int = 1
class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True

class ProductInfo(BaseModel):
    name: str
    description: str
    image: str
    quantity: int
    price: float

    category_name: str  
    
    class Config:
        from_attributes = True


class PaginatedProductsResponse(BaseModel):
    products: list[Product]
    total: int

    
    
    
    

