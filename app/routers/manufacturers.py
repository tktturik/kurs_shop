from schemas import ManufacturerCreate, Manufacturer
from db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
import models.manufacturers as models

router = APIRouter(
    prefix="/manufacturers",
    tags=["manufacturers"]
)

@router.post("/create", response_model=Manufacturer)
def create_manufacturer(manufacturer: ManufacturerCreate, db: Session = Depends(get_db)):
    db_manufacturer = models.Manufacturer(**manufacturer.model_dump())
    db.add(db_manufacturer)
    db.commit()
    db.refresh(db_manufacturer)
    return db_manufacturer 