import re

def normalize_text(value: str) -> str:
    """
    Normalizes text by lowercasing, removing extra whitespace, 
    and stripping out unnecessary special characters.
    """
    if not value:
        return ""
    
    # Lowercase and strip
    val = value.lower().strip()
    
    # Remove special characters except common punctuation (.,:;!?'"()[-])
    val = re.sub(r'[^\w\s.,:;!?\'"()\[\]-]', '', val)
    
    # Replace multiple whitespace characters with a single space
    val = re.sub(r'\s+', ' ', val)
    
    return val.strip()
