from foundation.common.log import getLogger
from .schema import Student

logger = getLogger(__name__)


def __setup__(module):
    module.resource("student", Student)
