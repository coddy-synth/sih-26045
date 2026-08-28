import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import schemas, models
from app.db import get_db

router = APIRouter(
    prefix="/cases",
    tags=["Cases"]
)

@router.post("", response_model=schemas.CaseResponse, status_code=status.HTTP_201_CREATED)
def create_case(payload: schemas.CreateCasePayload, db: Session = Depends(get_db)):
    submission_id = f"CASE-{uuid.uuid4().hex[:8].upper()}"
    new_case = models.FormulationSubmission(
        submission_id=submission_id,
        title=payload.title,
        description=payload.description,
        as_of_date=payload.as_of_date,
        jurisdiction=payload.jurisdiction,
        status="PENDING"
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return schemas.CaseResponse(
        id=new_case.submission_id,
        title=new_case.title,
        description=new_case.description,
        as_of_date=new_case.as_of_date,
        jurisdiction=new_case.jurisdiction,
        status=new_case.status
    )

@router.get("", response_model=List[schemas.CaseResponse])
def get_cases(db: Session = Depends(get_db)):
    cases = db.query(models.FormulationSubmission).all()
    return [
        schemas.CaseResponse(
            id=c.submission_id,
            title=c.title or "",
            description=c.description or "",
            as_of_date=c.as_of_date or "",
            jurisdiction=c.jurisdiction or "",
            status=c.status or ""
        ) for c in cases
    ]

@router.get("/{id}", response_model=schemas.CaseResponse)
def get_case(id: str, db: Session = Depends(get_db)):
    case = db.query(models.FormulationSubmission).filter(models.FormulationSubmission.submission_id == id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    return schemas.CaseResponse(
        id=case.submission_id,
        title=case.title or "",
        description=case.description or "",
        as_of_date=case.as_of_date or "",
        jurisdiction=case.jurisdiction or "",
        status=case.status or ""
    )

import json
from app.pipeline.orchestrator import execute_fact_extraction, execute_analysis

@router.post("/{id}/facts")
def extract_or_update_facts(id: str, db: Session = Depends(get_db)):
    case = db.query(models.FormulationSubmission).filter(models.FormulationSubmission.submission_id == id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    try:
        facts = execute_fact_extraction(id, case.description or "")
        return {"message": "Facts extracted", "facts": facts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{id}/analyze")
def run_analysis(id: str, db: Session = Depends(get_db)):
    try:
        result = execute_analysis(id)
        return {"message": "Analysis complete", "result": result}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{id}/explain")
def get_explainability(id: str, db: Session = Depends(get_db)):
    case = db.query(models.FormulationSubmission).filter(models.FormulationSubmission.submission_id == id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    if not case.result_json:
        raise HTTPException(status_code=404, detail="No analysis found for this case. Run /analyze first.")
        
    try:
        result_data = json.loads(case.result_json)
        # Construct the explainability trace required by the UI
        trace = {
            "steps": [
                {
                    "title": "Extracted Facts",
                    "status": "success",
                    "details": f"Extracted {len(result_data.get('facts', []))} facts."
                },
                {
                    "title": "Rules Triggered",
                    "status": "success" if result_data.get("fired_rules") else "warning",
                    "details": f"Triggered {len(result_data.get('fired_rules', []))} rules."
                },
                {
                    "title": "Evidence Retrieval",
                    "status": "success",
                    "details": f"Found {len(result_data.get('citations', []))} relevant chunks."
                },
                {
                    "title": "Conclusion",
                    "status": "success",
                    "details": result_data.get("explanation_text", "")
                }
            ],
            "confidence": result_data.get("confidence", {})
        }
        return trace
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse trace: {str(e)}")

@router.get("/{id}/report")
def get_report(id: str, db: Session = Depends(get_db)):
    case = db.query(models.FormulationSubmission).filter(models.FormulationSubmission.submission_id == id).first()
    if not case or not case.result_json:
        raise HTTPException(status_code=404, detail="Report not available")
        
    try:
        result_data = json.loads(case.result_json)
        return {
            "title": case.title,
            "description": case.description,
            "status": case.status,
            "classification": result_data.get("classification"),
            "full_analysis": result_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
