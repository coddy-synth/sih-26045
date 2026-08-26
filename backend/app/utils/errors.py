class BackendError(Exception):
    """Base error for backend-specific failures."""


class ConfigError(BackendError):
    pass


class RetrievalError(BackendError):
    pass
