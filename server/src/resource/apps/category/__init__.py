from .schema import Category, Tag
from flask import request
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity


def __setup__(module):
    module.resource("categories", Category)
    module.resource("tags", Tag)

    @module.endpoint("/arraytags", methods=["POST"])
    def add_more():
        pass
