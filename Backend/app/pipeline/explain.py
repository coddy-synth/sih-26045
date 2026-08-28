from typing import List, Dict, Any

def assemble_trace(events: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Assembles a coherent trace/log of pipeline events for the frontend.
    This enhances explainability by showing exactly what happened at each step.
    """
    trace = []
    for idx, event in enumerate(events or []):
        trace.append({
            "step": idx + 1,
            "module": event.get("module", "unknown"),
            "action": event.get("action", "unknown action"),
            "timestamp": event.get("timestamp"),
            "details": event.get("details", {})
        })
    return trace
