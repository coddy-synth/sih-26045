import uuid
import json
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import FormulationSubmission
from app.schemas import FormulationSubmitRequest, FormulationSubmissionResponse, FormulationDetailResponse
from app.pipeline.orchestrator import run_formulation_pipeline

router = APIRouter(prefix="/api/formulation", tags=["formulation"])

@router.post("/submit", response_model=FormulationSubmissionResponse)
async def submit_formulation(
    request: FormulationSubmitRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    submission_id = str(uuid.uuid4())
    
    new_submission = FormulationSubmission(
        submission_id=submission_id,
        title=request.title,
        ingredients=request.ingredients,
        disease=request.disease,
        preparation_method=request.preparation_method,
        dosage=request.dosage,
        route=request.route,
        status="PENDING"
    )
    
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    
    # Trigger the background pipeline task
    background_tasks.add_task(run_formulation_pipeline, submission_id)
    
    return FormulationSubmissionResponse(
        submission_id=submission_id,
        status="PENDING",
        message="Formulation submitted and processing started."
    )

@router.get("/{id}", response_model=FormulationDetailResponse)
def get_formulation(id: str, db: Session = Depends(get_db)):
    submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Formulation not found")
        
    result_data = None
    if submission.result_json:
        try:
            result_data = json.loads(submission.result_json)
        except json.JSONDecodeError:
            pass
            
    return FormulationDetailResponse(
        submission_id=submission.submission_id,
        title=submission.title or "Untitled",
        status=submission.status,
        result=result_data
    )

@router.get("/{id}/result")
def get_formulation_result(id: str, db: Session = Depends(get_db)):
    submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Formulation not found")
        
    if submission.status not in ["DONE", "FAILED"]:
        return {"status": submission.status, "message": "Result is not ready yet."}
        
    if not submission.result_json:
        return {"status": submission.status, "result": None}
        
    try:
        return json.loads(submission.result_json)
    except json.JSONDecodeError:
        return {"error": "Failed to parse result json"}
