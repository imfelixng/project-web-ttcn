from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, EmailType, IntType


class User(BaseModel):
    class Options:
        serialize_when_none = True

    userID = StringType(required=True)
    fullname = StringType(required=True)
    avatar = StringType()
    categories = ListType(StringType, default=[])
    tags = ListType(StringType, default=[])
    follow = ListType(StringType)
    votes = IntType(default=0)
    unvotes = IntType(default=0)
    password = StringType(required=True)
    email = EmailType(required=True)
    username = StringType()
    saveQuestions = ListType(StringType, default=[])
