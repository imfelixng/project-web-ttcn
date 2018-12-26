from .schema import Question
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from flask import request, session
from foundation.common.image import save_image_base64


def is_exist(array, index):
    for i in array:
        if index == i["tagID"]:
            return True
            break
    return False


def save_new_tags(module, raw_tags):
    current_tags = list(module.data.find("tag"))
    for r_tag in raw_tags:
        if not is_exist(current_tags, r_tag['tagID']):
            rs = module.data.insert_one("tag", r_tag)
            del[r_tag["_id"]]


def __setup__(module):
    module.resource("questions", Question)

    @module.endpoint("/questions/<questionID>/comments", methods=["GET"])
    @module.login_required
    def getAllComments(questionID):
        try:
            query = {
                "questionID": questionID
            }
            data = module.data.find("comment", query)
            return make_resource_response("resource", list(data))
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))

    @module.endpoint("/users/<userID>/questions", methods=["GET"])
    def getAllQuestion(userID):
        try:
            pipeline = [
                {
                    "$match": {
                        "userID": userID
                    }
                },
                {
                    "$project": {
                        "password": 0
                    }
                },
                {
                    "$lookup": {
                        "from": "question",
                        "localField": "userID",
                        "foreignField": "userID",
                        "as": "questions"
                    }
                },
                {
                    "$sort": {
                        "questions._updated": -1
                    }
                }
            ]
            data = module.data.aggregate("user", pipeline)
            return make_resource_response("resource", list(data))
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))

    @module.endpoint("/questions", methods=["POST"])
    @module.login_required
    def create():
        try:
            data = request.json

            # save image
            data = save_image_base64(module, data)
            # check and add new tag
            tags = data["tags"]
            save_new_tags(module, tags)
            # data["userID"] = session.get("userID")
            model = Question(data)
            resp = model.save()
            return make_resource_response("question", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/delete/<questionID>", methods=["DELETE"])
    def delete_question(questionID):
        module.data.delete_one("question", {"questionID": questionID})
        return "ok"

    @module.endpoint("/questions/<questionID>/follow", methods=["PATCH"])
    @module.login_required
    def question_follow(questionID):
        try:
            query = {
                "questionID": questionID
            }
            data = module.data.find_one(Question.RI(), query=query)
            data["userFollows"].append(session.get("userID"))
            module.data.update(Question.RI(), query, {"$set": data})
            return make_resource_response(Question.RI(), data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/<questionID>/unfollow", methods=["PATCH"])
    @module.login_required
    def question_unfollow(questionID):
        try:
            query = {
                "questionID": questionID
            }
            data = module.data.find_one(Question.RI(), query=query)
            del data["userFollows"][data["userFollows"].index(
                session.get("userID"))]
            module.data.update(Question.RI(), query, {"$set": data})
            return make_resource_response(Question.RI(), data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/<questionID>/save", methods=["PATCH"])
    @module.login_required
    def save_question(questionID):
        try:
            query = {
                "userID": session.get("userID")
            }
            data = module.data.find_one("user", query=query)
            data["saveQuestions"].append(questionID)
            module.data.update("user", query, {"$set": data})
            return make_resource_response("user", data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/topquestions", methods=["GET"])
    def top_questions():
        try:
            pipeline = [
                {
                    "$project": {
                        "sub": {
                            "$divide": [
                                {
                                    "$sum": [
                                        {
                                            "$subtract": [
                                                "$votes", "$unvotes"
                                            ]
                                        },
                                        {
                                            "$multiply": [
                                                "$comments", 2
                                            ]
                                        }
                                    ]
                                },
                                3
                            ]
                        },
                        "title": 1, "summaryContent": 1, "questionID": 1,
                        "images": 1, "topComment": 1, "categoryID":1,
                        "userID": 1, "tags": 1, "votes": 1, "unvotes": 1,
                        "views": 1, "comments": 1
                    }
                },
                {
                    "$sort": {
                        "sub": -1
                    }
                },
                {
                    "$limit": 5
                }]
            resp = module.data.aggregate("question", pipeline)
            return make_resource_response("question", list(resp))
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
