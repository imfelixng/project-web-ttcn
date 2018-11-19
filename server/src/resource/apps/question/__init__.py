from .schema import Question
from foundation.core.api.helper import make_resource_response
from flask import request
import os
import base64


def save_image(base, filepath):
    imgdata = base64.b64decode(base)
    with open(filepath, 'wb') as f:
        f.write(imgdata)


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
        for i in range(0, len(data["images"]), 1):
            image_raw = data["images"][i]
            imgString = image_raw["dataURL"][22:]
            filename = image_raw["upload"]["filename"]
            # path = os.getcwd()
            path = "/server/public/images/questions/" + filename
            save_image(imgString, path)
            data["images"][i]["dataURL"] = "/images/questions/" + filename

        rs = module.data.insert_one("question", data)
        return make_resource_response("resource", rs)
