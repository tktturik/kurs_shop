from app.schemas import AddressCreate, Address
from app.db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
import app.models.addresses as models

router = APIRouter(
    prefix="/addresses",
    tags=["addresses"]
)

@router.post("/create", response_model=Address)
def create_address(address: AddressCreate, db: Session = Depends(get_db)):
    db_address = models.Address(**address.model_dump())
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address 