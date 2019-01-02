from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, BaseType, IntType


class JsonString(BaseType):
    pass


class Question(BaseModel):
    class Options:
        serialize_when_none = True

    title = StringType(required=True)
    summaryContent = StringType(required=True, default="")
    questionID = StringType(required=True)
    content = JsonString(required=True)
    images = ListType(JsonString(),)
    topComment = JsonString()
    categoryID = StringType()
    userID = StringType(required=True)
    tags = ListType(JsonString())
    votes = IntType(default=0)
    unvotes = IntType(default=0)
    views = IntType(default=0)
    comments = IntType(default=0)
    userFollows = ListType(StringType, default=[])
    userSaves = ListType(StringType, default=[])
