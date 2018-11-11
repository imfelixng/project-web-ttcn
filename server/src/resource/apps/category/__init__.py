from .schema import Category


def __setup__(module):
    module.resource("category", Category)
