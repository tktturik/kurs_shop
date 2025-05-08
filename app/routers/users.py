from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.users import User
from schemas import UserResponse,UserCreate, UserLogin, User as UserSchema
from db import get_db
from dotenv import load_dotenv
from utils.auth import pwd_context
from fastapi.security import OAuth2PasswordBearer
import os
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from schemas import token

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/users/login")


router = APIRouter(
    prefix="/users",
    tags=["users"]
)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()  
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  
    return encoded_jwt

async def verify_jwt_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Недействительный токен",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])  
        if payload.get("sub") is None:  
            raise credentials_exception
        return payload
    except JWTError:  
        raise credentials_exception

@router.post("/registration", response_model=UserResponse)
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
    access_token = create_access_token(
        data={"sub": db_user.email}
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }

@router.get("/", response_model=list[UserSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль"
        )
    
    access_token = create_access_token(
        data={"sub": db_user.email}
    )
    return {"access_token": access_token, "token_type": "bearer", "user": {
        "id": db_user.id,
        "email": db_user.email,
        "firstname": db_user.firstname
    }}

@router.get("/me", response_model=UserSchema)
async def get_current_user(payload: dict = Depends(verify_jwt_token), db: Session = Depends(get_db)):
    email: str = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user
