from .schema import Question


def __setup__(module):
    module.resource("question", Question)
