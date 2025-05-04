from schemas import CategoryCreate, Category
from db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
import models.categories as models
from typing import Optional, List

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


@router.get("/", response_model=list[Category])
def get_categories(parent_id: Optional[int] = None, db: Session = Depends(get_db)):
    if parent_id is None:
        categories = db.query(models.Category).filter(models.Category.parentcategoryid == None).all()
    else:
        categories = db.query(models.Category).filter(models.Category.parentcategoryid == parent_id).all()
    return categories

@router.get("/tree", response_model=list[Category])
def get_category_tree(db: Session = Depends(get_db)):
    categories = db.query(models.Category).all()
    return categories


