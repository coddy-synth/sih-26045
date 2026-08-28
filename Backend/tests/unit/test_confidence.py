from app.pipeline.confidence import compute_confidence


def test_compute_confidence():
    dims = {"accuracy": 0.8, "trace": 0.6, "citation": 1.0}
    assert compute_confidence(dims) == 0.8
