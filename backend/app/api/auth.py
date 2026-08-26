from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User, OTPRecord
from app.schemas import UserCreate, UserResponse, OTPVerify, Token, UserLogin
from app.utils.security import get_password_hash, verify_password, create_access_token, generate_otp
from app.utils.email import send_otp_email
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signup", response_model=UserResponse)
async def signup(
    user_in: UserCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_pwd = get_password_hash(user_in.password)
    new_user = User(email=user_in.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    otp = generate_otp()
    expires = datetime.now(timezone.utc) + timedelta(minutes=10)
    
    # Store OTP
    otp_record = OTPRecord(email=new_user.email, otp_code=otp, expires_at=expires)
    db.add(otp_record)
    db.commit()
    
    # Send email in background
    background_tasks.add_task(send_otp_email, email=new_user.email, otp=otp)
    
    return new_user

@router.post("/verify-otp")
def verify_otp(otp_in: OTPVerify, db: Session = Depends(get_db)):
    otp_record = db.query(OTPRecord).filter(
        OTPRecord.email == otp_in.email,
        OTPRecord.otp_code == otp_in.otp_code
    ).first()
    
    if not otp_record:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    # check expiry but allow datetime without timezone comparison by standardizing
    now = datetime.now(timezone.utc)
    # If the DB returned naive datetimes, we might need to handle that, but typically SQLAlchemy with timezone=True handles it.
    # We will assume naive comparison if timezone is missing, but it should have it.
    if otp_record.expires_at.tzinfo is None:
        now = now.replace(tzinfo=None)
        
    if now > otp_record.expires_at:
        raise HTTPException(status_code=400, detail="OTP expired")
        
    user = db.query(User).filter(User.email == otp_in.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.is_verified = True
    db.delete(otp_record)
    db.commit()
    
    return {"message": "Email verified successfully"}

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
        
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified. Please verify your OTP.")
        
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

