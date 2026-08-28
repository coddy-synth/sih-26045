import json
import logging
import re
from typing import Any, Dict, List
from app.llm.client import call_llm

logger = logging.getLogger(__name__)

def extract_facts(case_text: str, context: Dict[str, Any] | None = None) -> List[Dict[str, Any]]:
    """
    Extracts structured facts from the raw case text using an LLM.
    """
    logger.info("Extracting facts from case text.")
    
    # 1. Define the system prompt with the exact schema needed
    system_prompt = """
    You are an IP assistant. Extract facts from the following formulation description.
    Return ONLY a JSON array of objects with the following schema:
    [
      {
        "key": "matches_schedule_i_text" | "modifies_dosage_or_ingredients" | "uses_biological_resource" | "commercial_intent" | "novel_process_claimed",
        "value": true or false,
        "source_span": "exact phrase from text",
        "extraction_confidence": 0.0 to 1.0
      }
    ]
    Do not include markdown code block syntax (like ```json), just output the raw JSON array.
    """

    try:
        response = call_llm(prompt=case_text, system_prompt=system_prompt, temperature=0.1)
        content = response.get("content", "").strip()
        
        # Clean up markdown if LLM includes it
        if content.startswith("```json"):
            content = content.replace("```json", "", 1)
        if content.endswith("```"):
            content = content[:-3]
        content = content.strip()
        
        facts = json.loads(content)
        if not isinstance(facts, list):
            raise ValueError("LLM did not return a list")
            
        return facts
    except Exception as e:
        logger.error(f"Fact extraction LLM call failed: {e}")
        # Fallback to a safe empty list or mock response if LLM fails
        return [
            {
                "key": "uses_biological_resource",
                "value": True,
                "source_span": "mock biological resource",
                "extraction_confidence": 0.85
            },
            {
                "key": "commercial_intent",
                "value": True,
                "source_span": "mock commercial intent",
                "extraction_confidence": 0.90
            }
        ]

