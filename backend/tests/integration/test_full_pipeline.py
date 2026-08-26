from app.pipeline.orchestrator import run_analysis


def test_run_analysis_returns_payload():
    result = run_analysis("case-001", "Aspirin use with headache.")
    assert result["case_id"] == "case-001"
    assert "answer" in result
