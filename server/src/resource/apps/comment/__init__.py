from .schema import Comment
from flask import request, session
from foundation.common.image import save_image_base64
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity


def __setup__(module):
    module.resource("comments", Comment)

    @module.endpoint("/comments", methods=["POST"])
    @module.login_required
    def comments():
        try:
            data = request.json
            # check image and store in folder
            data = save_image_base64(module, data)
            # data["userID"] = session.get("userID")
            model = Comment(data)
            resp = model.save()
            module.data.update("question",
                               {"questionID": data["questionID"]},
                               {
                                   "$inc": {"comments": 1}
                               })
            return make_resource_response("comment", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))

    @module.endpoint("/comments/<commentID>/replies", methods=["PATCH"])
    @module.login_required
    def replies(commentID):
        try:
            data = request.json
            module.data.update(
                "comment", {"commentID": commentID}, {"$set": data})
            resp = module.data.find_one("comment", commentID)
            return make_resource_response("comment", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))
