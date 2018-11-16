from .schema import Comment


def __setup__(module):
    module.resource("comments", Comment)
