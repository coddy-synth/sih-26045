from typing import List, Dict, Any
from app.rag.keyword_boost import get_keyword_scores

def validate_citations(citations: List[Dict[str, Any]], facts: List[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    """
    Validates that the provided citations are relevant to the extracted facts.
    Uses BM25 scoring to ensure citations meet a minimum relevance threshold.
    """
    if not citations:
        return []
        
    if not facts:
        # If no facts provided, just mark them all as valid for now
        for c in citations:
            c["is_valid"] = True
        return citations
        
    # Create a mega-query from all facts
    query = " ".join([str(f.get("value", "")) + " " + f.get("key", "") for f in facts])
    texts = [c.get("text", "") for c in citations]
    
    scores = get_keyword_scores(query, texts)
    
    validated = []
    for i, c in enumerate(citations):
        c_copy = dict(c)
        # Assume valid if score > 0.1
        c_copy["is_valid"] = scores[i] > 0.1 if i < len(scores) else True
        c_copy["validation_score"] = scores[i] if i < len(scores) else 1.0
        validated.append(c_copy)
        
    return validated
