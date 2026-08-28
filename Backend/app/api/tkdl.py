from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import TKDLRecord
from app.schemas import TKDLSearchResponse, TKDLRecordResponse

router = APIRouter(prefix="/api/tkdl", tags=["tkdl"])

@router.get("/search", response_model=TKDLSearchResponse)
def search_tkdl(
    ingredient: Optional[str] = Query(None, description="Search by ingredient"),
    disease: Optional[str] = Query(None, description="Search by disease"),
    tkrc_code: Optional[str] = Query(None, description="Search by TKRC/IPC code"),
    keyword: Optional[str] = Query(None, description="General keyword search"),
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Query the cleaned/structured TKDL dataset.
    This is a mock implementation that queries the skeleton TKDLRecord table.
    """
    query = db.query(TKDLRecord)
    
    if ingredient:
        query = query.filter(TKDLRecord.ingredients.ilike(f"%{ingredient}%"))
    if disease:
        query = query.filter(TKDLRecord.disease.ilike(f"%{disease}%"))
    if tkrc_code:
        query = query.filter(TKDLRecord.tkrc_code == tkrc_code)
    if keyword:
        # Simple fallback text search
        query = query.filter(
            (TKDLRecord.title.ilike(f"%{keyword}%")) |
            (TKDLRecord.ingredients.ilike(f"%{keyword}%")) |
            (TKDLRecord.disease.ilike(f"%{keyword}%"))
        )
        
    total_count = query.count()
    records = query.offset(offset).limit(limit).all()
    
    results = []
    for r in records:
        results.append(TKDLRecordResponse(
            record_id=r.record_id,
            title=r.title or "Unknown",
            disease=r.disease,
            ingredients=r.ingredients,
            tkrc_code=r.tkrc_code,
            ipc_code=r.ipc_code
        ))
        
    return TKDLSearchResponse(results=results, total_count=total_count)

@router.get("/record/{record_id}", response_model=TKDLRecordResponse)
def get_tkdl_record(record_id: str, db: Session = Depends(get_db)):
    """
    Fetch a single TKDL formulation record with full metadata.
    """
    record = db.query(TKDLRecord).filter(TKDLRecord.record_id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="TKDL Record not found")
        
    return TKDLRecordResponse(
        record_id=record.record_id,
        title=record.title or "Unknown",
        disease=record.disease,
        ingredients=record.ingredients,
        tkrc_code=record.tkrc_code,
        ipc_code=record.ipc_code
    )
