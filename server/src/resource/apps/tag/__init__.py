from .schema import Tag


def __setup__(module):
    module.resource("tag", Tag)
