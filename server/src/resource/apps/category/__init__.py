from .schema import Category, Tag
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from flask import session


def user_follow(module, item, ID, options):

    # Get tag or category with ID
    model = None
    if "tag" in item:
        data_update = module.data.find_one("tag",
                                           query={"tagID": ID})
        model = "tag"
    else:
        data_update = module.data.find_one(
            "category", query={"categoryID": ID})
        model = "category"
    # Get user with userID
    query = {
        "userID": session.get("userID")
    }
    data_user = module.data.find_one("user", query=query)

    # Check follow or unfollow
    if options == "follow":
        data_update["userFollows"].append(session.get("userID"))
        data_user[item].append(ID)
    else:
        del data_update["userFollows"][data_update["userFollows"].index(
            session.get("userID"))]
        del data_user[item][data_user[item].index(ID)]

    # Update model
    module.data.update(model, {model + "ID": ID}, {"$set": data_update})
    module.data.update("user", query, {"$set": data_user})

    # update follow for user
    return data_update


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
    @module.login_required
    def tag_follow(tagID):
        try:
            data_update = user_follow(module, "tags", tagID, "follow")
            return make_resource_response("user", data_update)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/tags/<tagID>/unfollow", methods=["PATCH"])
    @module.login_required
    def tag_unfollow(tagID):
        try:
            data_update = user_follow(module, "tags", tagID, "unfollow")
            return make_resource_response("user", data_update)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/categories/<categoryID>/follow", methods=["PATCH"])
    @module.login_required
    def category_follow(categoryID):
        try:
            data_update = user_follow(
                module, "categories", categoryID, "follow")
            return make_resource_response("user", data_update)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/categories/<categoryID>/unfollow", methods=["PATCH"])
    @module.login_required
    def category_unfollow(categoryID):
        try:
            data_update = user_follow(
                module, "categories", categoryID, "unfollow")
            return make_resource_response("user", data_update)
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
