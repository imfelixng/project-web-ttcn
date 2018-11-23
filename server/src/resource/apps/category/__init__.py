from .schema import Category, Tag
from flask import request
from foundation.core.api.helper import make_resource_response, make_error
from foundation.core.exceptions import UnprocessableEntity
from pprint import pprint


def __setup__(module):
    module.resource("categories", Category)
    module.resource("tags", Tag)

    @module.endpoint("/tags", methods=["POST"])
    def tag():
        data = request.json
        resp = module.data.insert_one("tag", data)
        return make_resource_response("resource", resp)

    @module.endpoint("/tags/<id>", methods=["GET"])
    def question_have_tag(id):
        tag = module.data.db.tag.find_one({"id": id})
        if tag is None:
            return make_error(200, "Resource is not found")
        query = {
            "tags": {
                "$eq": {
                    "id": tag["id"],
                    "text": tag["text"]
                }
            }
        }
        project = {
            "questionID": 1,
            "content.blocks.text": 1,
            "_id": 0
        }
        resp = list(module.data.aggregate("question", query, project))
        for i in resp:
            i["text"] = i["content"]["blocks"][0]["text"]
            del i["content"]
        return make_resource_response("resource", resp)

    @module.endpoint("/categories", methods=["POST"])
    def category():
        data = request.json
        resp = module.data.insert_one("category", data)
        return make_resource_response("resource", resp)
