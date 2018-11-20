from .schema import Question
from foundation.core.api.helper import make_resource_response
from flask import request
# import os
from .helper import save_image


def is_exist(array, index):
    for i in array:
        if index == i["id"]:
            return True
            break
    return False


def save_new_tags(module, raw_tags):
    current_tags = list(module.data.find("tag"))
    for r_tag in raw_tags:
        if not is_exist(current_tags, r_tag):
            data = {
                "id": r_tag,
                "text": r_tag
            }
            rs = module.data.insert_one("tag", data)


def findall(module):
    data = module.data.find("tag")
    return list(data)


def __setup__(module):
    module.resource("questions", Question)

    @module.endpoint("/questions/<questionID>/comments", methods=["GET"])
    def getAllComments(questionID):
        data = module.data.find_embedded(
            "question", "comment", questionID, "questionID", "questionID")
        return make_resource_response("resource", list(data))

    @module.endpoint("/users/<userID>/questions", methods=["GET"])
    def getAllQuestion(userID):
        data = module.data.find_embedded(
            "user", "question", userID, "userID", "userID")
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
            path = "/public/images/questions/" + filename
            save_image(imgString, path)
            data["images"][i]["dataURL"] = "/images/questions/" + filename

        # check and add new tag
        tagIDs = data["tagIDs"]
        save_new_tags(module, tagIDs)

        rs = module.data.insert_one("question", data)
        return make_resource_response("resource", rs)

    @module.endpoint("/listtag", methods=["GET"])
    def listtag():
        return str(findall(module))
