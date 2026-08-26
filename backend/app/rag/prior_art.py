from typing import Dict, Any
from app.rag.vector_store import VectorStore
from app.rag.keyword_boost import keyword_boost_score

# In a real app, this would be a persistent store singleton or connected to DB
_global_store = VectorStore("tkdl_prior_art")

def get_vector_store() -> VectorStore:
    return _global_store

def find_prior_art(query: str, limit: int = 5) -> Dict[str, Any]:
    store = get_vector_store()
    
    # 1. Vector Search
    vector_results = store.query(query, limit=limit * 2) # Fetch more for re-ranking
    
    final_results = []
    for doc in vector_results.get("documents", []):
        vec_score = doc["score"]
        # 2. Keyword Search Boost
        kw_score = keyword_boost_score(query, doc["text"])
        
        # 3. Hybrid Score (e.g. 70% vector, 30% keyword)
        hybrid_score = (vec_score * 0.7) + (kw_score * 0.3)
        
        final_results.append({
            "score": hybrid_score,
            "vector_score": vec_score,
            "keyword_score": kw_score,
            "text": doc["text"],
            "metadata": doc["metadata"]
        })
        
    final_results.sort(key=lambda x: x["score"], reverse=True)
    
    return {
        "query": query, 
        "limit": limit, 
        "results": final_results[:limit]
    }
