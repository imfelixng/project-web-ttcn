from schematics.types import StringType, IntType, BaseType, ListType
from foundation.core.schema.model import BaseModel


class JsonString(BaseType):
    pass


class Comment(BaseModel):
    class Options:
        serialize_when_none = True

    commentID = StringType(required=True)
    userID = StringType(required=True)
    questionID = StringType(required=True)
    content = JsonString(required=True)
    votes = IntType(default=0)
    unvotes = IntType(default=0)
    images = ListType(JsonString)
    replies = ListType(JsonString)
