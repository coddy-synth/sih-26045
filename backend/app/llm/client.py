from __future__ import annotations

from typing import Any, Dict


class LLMClient:
    def __init__(self, model: str | None = None):
        self.model = model or "stub-model"

    def generate(self, prompt: str, **kwargs: Any) -> Dict[str, Any]:
        return {
            "model": self.model,
            "prompt": prompt,
            "content": "stub response",
            "metadata": kwargs,
        }


def call_llm(prompt: str, **kwargs: Any) -> Dict[str, Any]:
    return LLMClient().generate(prompt=prompt, **kwargs)
