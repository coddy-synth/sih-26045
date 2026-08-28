from typing import List
import numpy as np

try:
    from rank_bm25 import BM25Okapi
except ImportError:
    BM25Okapi = None

def get_keyword_scores(query: str, documents: List[str]) -> List[float]:
    """
    Computes BM25 scores for a list of documents given a query.
    Scores are loosely normalized to a 0-1 range based on the max score.
    """
    if not documents:
        return []
    
    if BM25Okapi is None:
        # Fallback if rank-bm25 is not installed
        return [0.0] * len(documents)
        
    tokenized_corpus = [doc.lower().split() for doc in documents]
    bm25 = BM25Okapi(tokenized_corpus)
    tokenized_query = query.lower().split()
    
    scores = bm25.get_scores(tokenized_query)
    
    # Normalize loosely to 0-1 range
    max_score = max(scores) if len(scores) > 0 and max(scores) > 0 else 1.0
    normalized_scores = [(s / max_score) for s in scores]
    
    return normalized_scores
