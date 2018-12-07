from .schema import Question
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from flask import request, session
from foundation.common.image import save_image


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
            # lookup = {
            #     "from": "comment",
            #     "localField": "questionID",
            #     "foreignField": "questionID",
            #     "as": "comment"
            # }
            # project = {
            #     "password": 0
            # }
            # data = module.data.find_aggregate(
            #     "question", lookup, query, project)
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

            # check image and store in folder
            for i in range(0, len(data["images"]), 1):
                image_raw = data["images"][i]
                imgString = image_raw["dataURL"][22:]
                filename = image_raw["upload"]["filename"]
                path = "/public/images/questions/" + filename
                save_image(imgString, path)
                data["images"][i]["dataURL"] = "/images/questions/" + filename

            # check and add new tag
            tags = data["tags"]
            save_new_tags(module, tags)
            data["userID"] = session.get("userID")
            model = Question(data)
            resp = model.save()
            return make_resource_response("question", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
