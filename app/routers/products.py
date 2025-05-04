from schemas import ProductCreate, Product, ProductInfo
from db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Query
import models.products as models
import models.categories as category_models
from typing import Union


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


@router.get("/products_by_category/", response_model=list[Product])
def get_products_by_category(
    category_name: Union[str, None] = None,
    parent_category_name: Union[str, None] = None,
    db: Session = Depends(get_db)
):
    if category_name is not None:
        category = db.query(category_models.Category).filter(
            category_models.Category.categoryname == category_name
        ).first()
        
        if not category:
            raise HTTPException(status_code=404, detail="Категория не найдена")
            
        products = db.query(models.Product).filter(
            models.Product.categoryid == category.id
        ).all()
        return products
    
    elif parent_category_name is not None:
        parent_category = db.query(category_models.Category).filter(
            category_models.Category.categoryname == parent_category_name
        ).first()
        
        if not parent_category:
            raise HTTPException(status_code=404, detail="Родительская категория не найдена")
        
        child_categories = db.query(category_models.Category.id).filter(
            category_models.Category.parentcategoryid == parent_category.id
        ).all()
        
        category_ids = [parent_category.id] + [cat.id for cat in child_categories]
        products = db.query(models.Product).filter(
            models.Product.categoryid.in_(category_ids)
        ).all()
        return products
    
    else:
        raise HTTPException(
            status_code=400, 
            detail="Не указаны категории"
        )

@router.get("/trend_products", response_model=list[Product])
def get_trend_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).order_by(models.Product.quantity.asc()).limit(5).all()
    return products

@router.get("/new_products", response_model=list[Product])
def get_new_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).order_by(models.Product.created_at.desc()).limit(5).all()
    return products




@router.get("/{product_id}", response_model=ProductInfo)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
