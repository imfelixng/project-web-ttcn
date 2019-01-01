from schematics.types import StringType, ListType, BooleanType
from foundation.core.schema.model import BaseModel


class Notification(BaseModel):
    class Options:
        serialize_when_none = True

    notificationID = StringType(required=True)
    senders = ListType(StringType, required=True)
    userID = StringType(required=True)
    questionID = StringType(required=True)
    commentID = StringType(required=True)
    message = StringType(required=True)
    isRead = BooleanType(required=True)
