def compute_confidence(dimensions):
    if not dimensions:
        return 0.0
    return round(float(sum(dimensions.values())) / len(dimensions), 6)
