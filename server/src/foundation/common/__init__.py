import os


def env(key, defv=None):
    try:
        return os.environ[key]
    except Exception:
        return defv
