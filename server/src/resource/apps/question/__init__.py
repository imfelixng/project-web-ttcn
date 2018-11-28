from .schema import Question
from foundation.core.api.helper import make_resource_response
from flask import request
from .helper import save_image


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


def findall(module):
    data = module.data.find("tag")
    return list(data)


def __setup__(module):
    module.resource("questions", Question)

    @module.endpoint("/questions/<questionID>/comments", methods=["GET"])
    def getAllComments(questionID):
        query = {
            "questionID": questionID
        }
        lookup = {
            "from": "comment",
            "localField": "questionID",
            "foreignField": "questionID",
            "as": "comment"
        }
        project = {
            "password": 0
        }
        data = module.data.find_aggregate("question", lookup, query, project)
        return make_resource_response("resource", list(data))

    @module.endpoint("/users/<userID>/questions", methods=["GET"])
    def getAllQuestion(userID):
        query = {
            "userID": userID
        }
        lookup = {
            "from": "question",
            "localField": "userID",
            "foreignField": "userID",
            "as": "question"
        }
        project = {
            "password": 0
        }
        data = module.data.find_aggregate("user", lookup, query, project)
        return make_resource_response("resource", list(data))

    @module.endpoint("/questions", methods=["POST"])
    def create():
        data = request.json

        # check image and store in folder
        for i in range(0, len(data["images"]), 1):
            image_raw = data["images"][i]
            imgString = image_raw["dataURL"][22:]
            filename = image_raw["upload"]["filename"]
            # path = os.getcwd()
            path = "/app/server/public/images/questions/" + filename
            save_image(imgString, path)
            data["images"][i]["dataURL"] = "/images/questions/" + filename

        # check and add new tag
        tags = data["tags"]
        save_new_tags(module, tags)

        rs = module.data.insert_one("question", data)
        return make_resource_response("resource", rs)

    @module.endpoint("/listtag", methods=["GET"])
    def listtag():
        return str(findall(module))
