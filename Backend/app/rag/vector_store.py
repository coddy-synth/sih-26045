import uuid
from typing import List, Dict, Any
import chromadb
from app.rag.embeddings import embed_text

class VectorStore:
    def __init__(self, collection_name: str = "default"):
        self.collection_name = collection_name
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )

    def query(self, text: str, limit: int = 5) -> Dict[str, Any]:
        query_emb = embed_text(text)["embedding"]
        
        results = self.collection.query(
            query_embeddings=[query_emb],
            n_results=limit
        )
        
        formatted_results = []
        if results and results['documents'] and results['documents'][0]:
            docs = results['documents'][0]
            metadatas = results['metadatas'][0] if results['metadatas'] else []
            distances = results['distances'][0] if results['distances'] else []
            
            for i in range(len(docs)):
                # Chroma returns distances. Cosine distance = 1 - Cosine similarity
                distance = distances[i] if i < len(distances) else 0.0
                score = 1.0 - distance
                formatted_results.append({
                    "score": score,
                    "text": docs[i],
                    "metadata": metadatas[i] if i < len(metadatas) else {}
                })
                
        return {"query": text, "limit": limit, "documents": formatted_results}

    def add(self, documents: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        documents: list of dicts with 'text' and optional 'metadata'
        """
        if not documents:
            return {"added": 0}
            
        ids = []
        embeddings = []
        metadatas = []
        texts = []
        
        for doc in documents:
            text = doc.get("text", "")
            if text:
                emb = embed_text(text)["embedding"]
                ids.append(str(uuid.uuid4()))
                embeddings.append(emb)
                # metadata cannot have complex types in Chroma (only string, int, float, bool)
                clean_metadata = {k: v for k, v in doc.get("metadata", {}).items() if isinstance(v, (str, int, float, bool))}
                metadatas.append(clean_metadata)
                texts.append(text)
                
        if ids:
            self.collection.add(
                ids=ids,
                embeddings=embeddings,
                metadatas=metadatas,
                documents=texts
            )
            
        return {"added": len(ids)}
