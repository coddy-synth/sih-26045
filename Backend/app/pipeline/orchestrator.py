import json
import logging
from sqlalchemy.orm import Session
from app.models import FormulationSubmission
from app.db import SessionLocal
from app.rag.prior_art import find_prior_art
from app.llm.client import call_llm
from app.pipeline.fact_extraction import extract_facts
from app.pipeline.rule_engine import evaluate_rules
from app.pipeline.confidence import compute_confidence

logger = logging.getLogger(__name__)

def execute_fact_extraction(submission_id: str, case_text: str) -> list:
    """
    Executes the LLM Fact Extraction step.
    Returns a list of extracted facts.
    """
    db: Session = SessionLocal()
    try:
        submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == submission_id).first()
        if not submission:
            raise ValueError(f"Submission {submission_id} not found.")

        submission.status = "PROCESSING"
        db.commit()

        # Call fact extraction
        facts = extract_facts(case_text)
        
        # Save structured facts to result_json temporarily
        current_result = {}
        if submission.result_json:
            try:
                current_result = json.loads(submission.result_json)
            except:
                pass
        
        current_result["facts"] = facts
        submission.result_json = json.dumps(current_result)
        db.commit()
        
        return facts
    finally:
        db.close()

def execute_analysis(submission_id: str) -> dict:
    """
    Executes the Rule Engine, RAG Retrieval, and Confidence pipelines.
    """
    db: Session = SessionLocal()
    try:
        submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == submission_id).first()
        if not submission:
            raise ValueError(f"Submission {submission_id} not found.")

        # 1. Retrieve extracted facts
        current_result = {}
        if submission.result_json:
            try:
                current_result = json.loads(submission.result_json)
            except:
                pass
                
        facts = current_result.get("facts", [])
        if not facts:
            raise ValueError("Facts must be extracted and confirmed before analysis.")

        submission.status = "SCORED"
        db.commit()

        # 2. Rule Engine
        rule_results = evaluate_rules(facts)
        
        # 3. RAG / Evidence Retrieval
        # We query the vector store for the triggered rules' citations or user text
        query_text = f"{submission.title or ''} {submission.description or ''}"
        prior_art_res = find_prior_art(query_text, limit=3)
        matches = prior_art_res.get("results", [])
        
        # 4. Confidence Engine
        # Here we mock the dimensions based on extraction and rules
        dimensions = {
            "fact_conf": facts[0].get("extraction_confidence", 0.5) if facts else 0.5,
            "rule_fit_conf": 1.0 if rule_results["rules_applied"] > 0 else 0.0,
            "evidence_conf": matches[0]["score"] if matches else 0.0,
            "citation_conf": 0.8
        }
        confidence_result = compute_confidence(dimensions)
        
        # 5. Explainability (LLM Generation)
        submission.status = "EXPLAINED"
        db.commit()
        
        prompt = (
            f"Facts: {json.dumps(facts)}\n"
            f"Rules Triggered: {json.dumps(rule_results['matches'])}\n"
            f"Matches: {json.dumps(matches)}\n"
            f"Provide a plain-language explanation of this legal conclusion."
        )
        system_prompt = "You are an expert legal assistant. Explain the classification based on the provided facts, rules, and prior art matches."
        
        try:
            llm_response = call_llm(prompt=prompt, system_prompt=system_prompt, temperature=0.3)
            explanation = llm_response.get("content", "Explanation generation failed.")
        except Exception as e:
            logger.error(f"Explanation LLM call failed: {e}")
            explanation = "Based on the rules, this formulation is categorized as: " + rule_results["classification"]
        
        # 6. Final Result Assembly
        final_result = {
            "facts": facts,
            "classification": rule_results["classification"],
            "confidence": confidence_result,
            "fired_rules": rule_results["matches"],
            "explanation_text": explanation,
            "citations": [doc.get("metadata", {}).get("id", f"doc_{i}") for i, doc in enumerate(matches)]
        }
        
        submission.status = "DONE"
        submission.result_json = json.dumps(final_result)
        db.commit()
        
        return final_result
    except Exception as e:
        logger.error(f"[{submission_id}] Pipeline failed: {str(e)}")
        submission.status = "FAILED"
        submission.result_json = json.dumps({"error": str(e)})
        db.commit()
        raise e
    finally:
        db.close()

import asyncio

async def run_formulation_pipeline(submission_id: str):
    """
    Background wrapper for the legacy /formulation endpoint.
    Runs extraction and analysis sequentially.
    """
    db: Session = SessionLocal()
    try:
        submission = db.query(FormulationSubmission).filter(FormulationSubmission.submission_id == submission_id).first()
        if not submission:
            return
            
        case_text = f"{submission.title or ''} {submission.ingredients or ''} {submission.disease or ''}"
        execute_fact_extraction(submission_id, case_text)
        execute_analysis(submission_id)
    except Exception as e:
        logger.error(f"Background pipeline failed: {e}")
    finally:
        db.close()
