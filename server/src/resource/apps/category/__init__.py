from .schema import Category, Tag
from flask import request
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity


def __setup__(module):
    module.resource("categories", Category)
    module.resource("tags", Tag)

    @module.endpoint("/tags", methods=["POST"])
    def tag():
        data = request.json
        resp = module.data.insert_one("tag", data)
        return make_resource_response("resource", resp)
