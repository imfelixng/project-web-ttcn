from .schema import Comment
from flask import request, session
from foundation.common.image import save_image_base64
from foundation.common.helper import update_top_commment
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from resource.apps.notification.schema import Notification
import datetime
import logging
import time


def notification(module, data_request):
    data = {
        "notificationID": "n_" + str(time.time()),
        "senderID": session.get("userID"),
        "receiverID": module.data.find_one("question",
                                           ID=data_request["questionID"])["userID"],
        "questionID": data_request["questionID"],
        "commentID": data_request["commentID"],
        "message": session.get("userID") + " commented on your question"
    }
    logging.warn("notification %s" % data)
    model = Notification(data)
    model.save()
    logging.warn("notification %s" % model)


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
            notification(module, data)
            return make_resource_response("comment", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))

    @module.endpoint("/comments/<commentID>/replies", methods=["PATCH"])
    @module.login_required
    def replies(commentID):
        try:
            data_request = request.json
            data_request = save_image_base64(module, data_request)

            data_request["_created"] = datetime.datetime.now() + \
                datetime.timedelta(hours=7)
            data_request["_updated"] = datetime.datetime.now() + \
                datetime.timedelta(hours=7)

            data = module.data.find_one("comment", ID=commentID)
            data["replies"].append(data_request)
            logging.warn("data_replies %s" % data)

            module.data.update(
                "comment", {"commentID": commentID}, {"$set": data})

            update_top_commment(module, data["questionID"])
            return make_resource_response("comment", data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))
