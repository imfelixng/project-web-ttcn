from foundation.common.config import getConfig
from foundation.common.log import getLogger

config = getConfig(__name__)
logger = getLogger(__name__)

from .base import ObjectApiServer


__all__ = ('ObjectApiServer', )
