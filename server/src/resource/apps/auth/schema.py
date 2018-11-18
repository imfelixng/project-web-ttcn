from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, EmailType, IntType


class User(BaseModel):
    userID = StringType(required=True)
    fullname = StringType(required=True)
    avatar = StringType()
    categories = ListType(StringType)
    follow = ListType(StringType)
    vote = IntType()
    unvote = IntType()
    password = StringType(required=True)
    email = EmailType(required=True)
    id = IntType()
    username = StringType()
