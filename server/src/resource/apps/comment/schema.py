from schematics.types import StringType, IntType, BaseType, ListType
from foundation.core.schema.model import BaseModel


class JsonString(BaseType):
    pass


class Comment(BaseModel):
    commentID = StringType(required=True)
    userID = StringType(required=True)
    questionID = StringType(required=True)
    content = JsonString(required=True)
    votes = IntType()
    unvote = IntType()
    images = ListType(JsonString)
    reply = ListType(JsonString)
