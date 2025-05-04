from schemas import ProductCreate, Product
from db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Query
import models.products as models
import models.categories as category_models

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@router.post("/create", response_model=Product)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/showall", response_model=list[Product])
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    return products

@router.get("/show_pagging", response_model=list[Product])
def get_some_products(
    skip: int = Query(0),
    limit: int = Query(5),
    db: Session = Depends(get_db)
):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products

@router.get("/find_by_name", response_model=list[Product])
def find_by_name(name: str, db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.name == name).all()
    return products

@router.get("/by_category/{category_id}", response_model=list[Product])
def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.categoryid == category_id).all()
    return products

@router.get("/by_parent_category/{parent_category_id}", response_model=list[Product])
def get_products_by_parent_category(parent_category_id: int, db: Session = Depends(get_db)):
    child_categories = db.query(category_models.Category.id).filter(
        category_models.Category.parentcategoryid == parent_category_id
    ).all()
    category_ids = [parent_category_id] + [cat.id for cat in child_categories]
    
    products = db.query(models.Product).filter(
        models.Product.categoryid.in_(category_ids)
    ).all()
    
    return products

@router.get("/trend_products", response_model=list[Product])
def get_trend_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).order_by(models.Product.quantity.asc()).limit(5).all()
    return products

@router.get("/new_products", response_model=list[Product])
def get_new_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).order_by(models.Product.created_at.desc()).limit(5).all()
    return products




@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
