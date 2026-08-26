import hashlib
from typing import Dict, Any

def embed_text(text: str) -> Dict[str, Any]:
    """Simulate generating an embedding vector of length 768 for the given text."""
    # Create a deterministic mock embedding based on the text
    h = hashlib.sha256(text.encode('utf-8')).digest()
    # Expand to 768 dimensions by repeating the 32 bytes and normalizing
    base_vector = [float(b) / 255.0 for b in h]
    embedding = (base_vector * 24)[:768]
    return {"text": text, "embedding": embedding}
