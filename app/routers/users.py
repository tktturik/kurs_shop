from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.users import User
from schemas import UserCreate, UserLogin, User as UserSchema
from db import get_db
from utils.auth import pwd_context

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.post("/registration", response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    users = db.query(User).all() 
    for i in users:
        if i.email == user.email:
            raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        firstname=user.firstname,
        role=user.role,
        avatar=user.avatar,
        email=user.email,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/", response_model=list[UserSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.post("/login", response_model=UserSchema)
def login(user: UserLogin, db: Session = Depends(get_db)):
    users = db.query(User).all()   
    for i in users:
        if i.email == user.email:
            if pwd_context.verify(user.password, i.password):
                return i
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Неверный email или пароль"
    ) 