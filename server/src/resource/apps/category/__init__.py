from .schema import Category, Tag
from foundation.core.api.helper import make_resource_response, make_error
from foundation.core.exceptions import UnprocessableEntity


def __setup__(module):
    module.resource("categories", Category)
    module.resource("tags", Tag)

    @module.endpoint("/tags/<id>", methods=["GET"])
    def question_have_tag(id):
        try:
            tag = module.data.db.tag.find_one({"id": id})
            if tag is None:
                return make_error(200, "Resource is not found")
            query = {
                "$or": [
                    {
                        "tags": {
                            "$eq": {
                                "tagID": tag["tagID"],
                                "id": tag["id"],
                                "text": tag["text"]
                            }
                        }
                    },
                    {
                        "tags": {
                            "$eq": {
                                "id": tag["id"],
                                "text": tag["text"],
                                "tagID": tag["tagID"]
                            }
                        }
                    }]
            }
            project = {
                "_id": 0
            }
            resp = list(module.data.aggregate("question", query, project))
            return make_resource_response("resource", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
