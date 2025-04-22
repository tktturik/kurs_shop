from pydantic import BaseModel
from typing import Optional

class AddressBase(BaseModel):
    street: str
    housenumber: str
    additionalinfo: Optional[str] = None

class AddressCreate(AddressBase):
    pass

class Address(AddressBase):
    id: int
    
    class Config:
        orm_mode = True
        from_attributes = True 