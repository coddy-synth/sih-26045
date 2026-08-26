import math
from typing import List, Dict, Any
from app.rag.embeddings import embed_text

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    dot_product = sum(a * b for a, b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a * a for a in v1))
    norm_v2 = math.sqrt(sum(b * b for b in v2))
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
    return dot_product / (norm_v1 * norm_v2)

class VectorStore:
    def __init__(self, collection_name: str = "default"):
        self.collection_name = collection_name
        self.documents = []  # List of dicts with 'text', 'metadata', 'embedding'

    def query(self, text: str, limit: int = 5) -> Dict[str, Any]:
        if not self.documents:
            return {"query": text, "limit": limit, "documents": []}
            
        query_emb = embed_text(text)["embedding"]
        
        results = []
        for doc in self.documents:
            score = cosine_similarity(query_emb, doc["embedding"])
            results.append({
                "score": score,
                "text": doc["text"],
                "metadata": doc.get("metadata", {})
            })
            
        # Sort by score descending
        results.sort(key=lambda x: x["score"], reverse=True)
        return {"query": text, "limit": limit, "documents": results[:limit]}

    def add(self, documents: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        documents: list of dicts with 'text' and optional 'metadata'
        """
        if not documents:
            return {"added": 0}
            
        count = 0
        for doc in documents:
            text = doc.get("text", "")
            if text:
                emb = embed_text(text)["embedding"]
                self.documents.append({
                    "text": text,
                    "metadata": doc.get("metadata", {}),
                    "embedding": emb
                })
                count += 1
                
        return {"added": count}
