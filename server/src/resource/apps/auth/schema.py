from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, EmailType


class User(BaseModel):
    username = StringType(required=True)
    avatar = StringType()
    categories = ListType(StringType)
    follow = ListType(StringType)
    vote = ListType(StringType)
    unvote = ListType(StringType)
    password = StringType(required=True)
    email = EmailType(required=True)
