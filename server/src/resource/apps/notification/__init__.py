from schematics.types import StringType, BaseType
from foundation.core.schema.model import BaseModel


class Notification(BaseModel):
    class Options:
        serialize_when_none = True

    notificationID = StringType(required=True)
    senderID = StringType(required=True)
    receiverID = StringType(required=True)
    questionID = StringType(required=True)
