from typing import Any, Dict


def extract_facts(case_text: str, context: Dict[str, Any] | None = None) -> list[dict[str, Any]]:
    return [{"key": "summary", "value": case_text.strip(), "source": "input"}]
