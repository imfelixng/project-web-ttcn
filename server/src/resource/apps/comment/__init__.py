from .schema import Comment
from flask import request, session
from flask import current_app as app
from foundation.common.image import save_image_base64
from foundation.common.helper import update_top_commment
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from resource.apps.notification.schema import Notification
import datetime
import logging
import time


def notification(module, data_request, message):

    # Get infor question
    question = module.data.find_one("question",
                                    ID=data_request["questionID"])
    userID_questions = question["userID"]
    question["userFollows"].append(userID_questions)
    userFollows = question["userFollows"]
    # logging.warn("User Follows %s", userFollows)
    # Get all notification of question
    notification_old = module.data.find_one("notification",
                                            query={
                                                "userID": userID_questions,
                                                "questionID": data_request["questionID"]
                                            })
    # Update notification
    if notification_old is not None:
        notification_olds = list(module.data.find("notification", {
            "questionID": question["questionID"]
        }))
        notification_olds.append(notification_old)
        for notification in notification_olds:
            notification["isRead"] = False
            if session.get("userID") not in notification["senders"]:
                notification["senders"].append(session.get("userID"))
            module.data.update("notification", {
                               "notificationID": notification["notificationID"]},
                               {"$set": notification})
    else:
        for user in userFollows:
            data = {
                "notificationID": "n_b" + str(time.time()),
                "senders": [session.get("userID")],
                "userID": user,
                "questionID": data_request["questionID"],
                "commentID": data_request["commentID"],
                "message": message + " on your question",
                "isRead": False
            }
            model = Notification(data)
            model.save()
    app.mqtt.publish("notification", "have notification")


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
            # logging.warn("Comment is create %s", resp)
            # Create notification
            notification(module, data, message="commented")
            logging.warn("Notification is create")
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
            data_request = request.json
            data_request = save_image_base64(module, data_request)

            data_request["_created"] = datetime.datetime.now() + \
                datetime.timedelta(hours=7)
            data_request["_updated"] = datetime.datetime.now() + \
                datetime.timedelta(hours=7)

            data = module.data.find_one("comment", ID=commentID)
            data["replies"].append(data_request)
            # logging.warn("data_replies %s" % data)

            module.data.update(
                "comment", {"commentID": commentID}, {"$set": data})

            update_top_commment(module, data["questionID"])
            return make_resource_response("comment", data)
        except Exception as e:
            raise UnprocessableEntity("RC_400", str(e))
