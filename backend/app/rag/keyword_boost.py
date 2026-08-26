from collections import Counter

def keyword_boost_score(query: str, document: str) -> float:
    """
    A simple TF-IDF inspired keyword scoring function.
    """
    q_words = query.lower().split()
    d_words = document.lower().split()
    
    if not q_words or not d_words:
        return 0.0
        
    d_counts = Counter(d_words)
    score = 0.0
    for qw in set(q_words):
        tf = d_counts.get(qw, 0) / len(d_words)
        # Mock IDF: assume rare words have higher weight. 
        # In a real system, IDF is computed across the corpus.
        idf = 1.0 # placeholder
        score += tf * idf
        
    return min(score * 10, 1.0) # Normalize loosely to 0-1 range
