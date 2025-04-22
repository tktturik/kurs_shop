from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.users import User
from app.schemas import UserCreate, UserLogin, User as UserSchema
from app.db import get_db

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
    db_user = User(
        name=user.name,
        surname = user.surname,
        role=user.role,
        avatar=user.avatar,
        email=user.email,
        password=user.password
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
            if user.password == i.password:
                return i  # Возвращаем пользователя, если все ок
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Неверный пароль"
                )
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Пользователь с таким email не найден"
    )
