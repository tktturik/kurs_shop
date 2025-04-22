from app.schemas import CategoryCreate, Category
from app.db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
import app.models.categories as models

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

@router.post("/create", response_model=Category)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = models.Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
