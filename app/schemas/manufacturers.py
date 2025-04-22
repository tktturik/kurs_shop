from pydantic import BaseModel
from typing import Optional

class ManufacturerBase(BaseModel):
    name: str
    description: Optional[str] = None
    contactinfo: Optional[str] = None
    address: Optional[int] = None

class ManufacturerCreate(ManufacturerBase):
    pass

class Manufacturer(ManufacturerBase):
    id: int
    
    class Config:
        orm_mode = True
        from_attributes = True 