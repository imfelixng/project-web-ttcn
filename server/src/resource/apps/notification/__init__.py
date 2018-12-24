from .schema import Notification
from flask import current_app as app


def on_save_notification(model, *args, **kwargs):
    app.mqtt.publish("notification", model.to_primitive())


def __setup__(module):
    Notification.register_hook('on_save', on_save_notification)
    module.resource("notifications", Notification)
