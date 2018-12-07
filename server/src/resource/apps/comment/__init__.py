from .schema import Comment
from flask import request
from foundation.common.image import save_image
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
import os


def __setup__(module):
    module.resource("comments", Comment)

    @module.endpoint("/comments", methods=["POST"])
    def comments():
        try:
            data = request.json

            # check image and store in folder
            for i in range(0, len(data["images"]), 1):
                image_raw = data["images"][i]
                imgString = image_raw["dataURL"][22:]
                filename = image_raw["upload"]["filename"]
                # path = os.getcwd()
                path = os.path.join(
                    module.config['PUBLIC_PATH'],
                    "images", "comments")
                if not os.path.exists(path):
                    os.makedirs(path)
                path = os.path.join(path, filename)
                save_image(imgString, path)
                data["images"][i]["dataURL"] = "/images/comments/" + filename

            model = Comment(data)
            resp = model.save()
            module.data.update("question", {"questionID": data["questionID"]}, {
                               "$inc": {"comments": 1}})
            return make_resource_response("resource", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))
