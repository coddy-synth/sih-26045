from __future__ import annotations
import os
import logging
from typing import Any, Dict

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

logger = logging.getLogger(__name__)

class LLMClient:
    def __init__(self, model: str | None = None):
        self.model = model or "gpt-4o-mini"
        api_key = os.getenv("OPENAI_API_KEY")
        if OpenAI and api_key:
            self.client = OpenAI(api_key=api_key)
        else:
            self.client = None
            if not OpenAI:
                logger.warning("openai package not installed. LLM calls will fail.")
            elif not api_key:
                logger.warning("OPENAI_API_KEY environment variable not set. LLM calls will fail.")

    def generate(self, prompt: str, system_prompt: str | None = None, **kwargs: Any) -> Dict[str, Any]:
        if not self.client:
            raise RuntimeError("OpenAI client not initialized. Check API key and dependencies.")
            
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=kwargs.get("temperature", 0.3),
            max_tokens=kwargs.get("max_tokens", 1000)
        )
        
        return {
            "model": self.model,
            "prompt": prompt,
            "content": response.choices[0].message.content,
            "metadata": kwargs,
        }

def call_llm(prompt: str, system_prompt: str | None = None, **kwargs: Any) -> Dict[str, Any]:
    return LLMClient().generate(prompt=prompt, system_prompt=system_prompt, **kwargs)
