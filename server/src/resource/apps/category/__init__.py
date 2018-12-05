from .schema import Category, Tag
from foundation.core.api.helper import make_resource_response, make_error
from foundation.core.exceptions import UnprocessableEntity


def __setup__(module):
    module.resource("categories", Category)
    module.resource("tags", Tag)

    @module.endpoint("/tags/<id>", methods=["GET"])
    def question_have_tag(id):
        try:
            pipeline = [
                {
                    "$match": {
                        "tags.id": id
                    }
                },
                {
                    "$project": {
                        "_id": 0
                    }
                },
                {
                    "$sort": {
                        "_updated": -1
                    }
                }
            ]
            resp = list(module.data.aggregate("question", pipeline))
            return make_resource_response("resource", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
