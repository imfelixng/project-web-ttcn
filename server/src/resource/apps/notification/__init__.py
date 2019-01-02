from .schema import Notification
from foundation.core.api.helper import make_resource_response
from foundation.core.exceptions import UnprocessableEntity
# from flask import current_app as app


# def on_save_notification(model, *args, **kwargs):
#     app.mqtt.publish("notification", "have notification")


def __setup__(module):
    # Notification.register_hook('on_save', on_save_notification)
    module.resource("notifications", Notification)

    @module.endpoint("/users/<userID>/notifications", methods=["GET"])
    @module.login_required
    def get_notification(userID):
        try:
            resp = module.data.find("notification", {
                "receiverID": userID,
                "isRead": False
            })
            return make_resource_response("notification", list(resp))
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/users/<userID>/allnotifications", methods=["GET"])
    @module.login_required
    def get_allnotification(userID):
        try:
            resp = module.data.find("notification", {
                "receiverID": userID,
            })
            return make_resource_response("notification", list(resp))
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
