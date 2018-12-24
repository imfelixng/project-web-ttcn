from .schema import Category, Tag
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from flask import session


def user_follow(module, item, ID):
    query = {
        "userID": session.get("userID")
    }
    data = module.data.find_one("user", query=query)
    data[item].append(ID)
    module.data.update("user", query, {"$set": data})
    return data


def __setup__(module):
    module.resource("categories", Category)
    module.resource("tags", Tag)

    @module.endpoint("/tags/<id>/questions", methods=["GET"])
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

    @module.endpoint("/categories/<categoryID>/questions", methods=["GET"])
    def question_have_category(categoryID):
        try:
            pipeline = [
                {
                    "$match": {
                        "categoryID": categoryID
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

    @module.endpoint("/tags/<tagID>/follow", methods=["PATCH"])
    def tag_follow(tagID):
        try:
            data = user_follow(module, "tags", tagID)
            return make_resource_response("user", data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/categories/<categoryID>/follow", methods=["PATCH"])
    def category_follow(categoryID):
        try:
            data = user_follow(module, "categories", categoryID)
            return make_resource_response("user", data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/tags/toptags", methods=["GET"])
    def top_tag():
        try:
            pipeline = [
                {
                    "$unwind": "$tags"
                },
                {
                    "$group": {
                        "_id": "$tags",
                        "count": {
                            "$sum": 1
                        }
                    }
                },
                {
                    "$sort": {
                        "count": -1
                    }
                },
                {
                    "$limit": 5
                }
            ]
            resp = module.data.aggregate("question", pipeline)
            return make_resource_response("tag", list(resp))
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
