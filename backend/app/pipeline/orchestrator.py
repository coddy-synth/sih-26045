import asyncio
import json
import logging
from sqlalchemy.orm import Session
from app.models import FormulationSubmission
from app.db import SessionLocal
from app.rag.prior_art import find_prior_art
from app.llm.client import call_llm

logger = logging.getLogger(__name__)

async def run_formulation_pipeline(submission_id: str):
    """
    Background task to orchestrate the formulation processing pipeline.
    Status tracking: PENDING -> PROCESSING -> SCORED -> EXPLAINED -> DONE / FAILED
    """
    db: Session = SessionLocal()
    try:
        # Fetch submission
        submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == submission_id).first()
        if not submission:
            logger.error(f"Submission {submission_id} not found in database.")
            return

        # 1. PROCESSING - NLP / Entity Extraction
        submission.status = "PROCESSING"
        db.commit()
        logger.info(f"[{submission_id}] Status: PROCESSING - Extracting entities...")
        
        # Combine text for search
        query_text = f"{submission.title or ''} {submission.ingredients or ''} {submission.disease or ''}"
        await asyncio.sleep(0.1) # Simulate minor delay
        
        # 2. SCORED - Similarity & ML Risk Score
        submission.status = "SCORED"
        db.commit()
        logger.info(f"[{submission_id}] Status: SCORED - Calculating similarity and risk...")
        
        # Perform retrieval
        prior_art_res = find_prior_art(query_text, limit=5)
        matches = prior_art_res.get("results", [])
        
        # Mock ML Output based on retrieval
        mock_risk_category = "High Risk" if matches and matches[0]["score"] > 0.5 else "Low Risk"
        mock_confidence = 0.85
        mock_similarity = {doc.get("metadata", {}).get("id", f"doc_{i}"): doc["score"] for i, doc in enumerate(matches)}
        
        # 3. EXPLAINED - RAG Generation
        submission.status = "EXPLAINED"
        db.commit()
        logger.info(f"[{submission_id}] Status: EXPLAINED - Generating explanation via RAG...")
        
        # Generate explanation using LLM client
        prompt = (
            f"Formulation: {query_text}\n"
            f"Matches: {json.dumps(matches)}\n"
            f"Risk: {mock_risk_category}\n"
            f"Provide a brief explanation."
        )
        llm_response = call_llm(prompt)
        explanation = llm_response.get("content", "No explanation generated.")
        
        # 4. DONE - Persist final result
        final_result = {
            "risk_category": mock_risk_category,
            "confidence": mock_confidence,
            "similarity_scores": mock_similarity,
            "explanation_text": explanation,
            "citations": list(mock_similarity.keys())
        }
        
        submission.status = "DONE"
        submission.result_json = json.dumps(final_result)
        db.commit()
        logger.info(f"[{submission_id}] Status: DONE")

    except Exception as e:
        logger.error(f"[{submission_id}] Pipeline failed: {str(e)}")
        # Re-fetch in case session was invalidated
        db.rollback()
        submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == submission_id).first()
        if submission:
            submission.status = "FAILED"
            submission.result_json = json.dumps({"error": str(e)})
            db.commit()
    finally:
        db.close()
