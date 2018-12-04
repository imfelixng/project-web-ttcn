from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, BaseType, IntType


class JsonString(BaseType):
    pass


class Question(BaseModel):
    questionID = StringType(required=True)
    content = JsonString(required=True)
    images = ListType(JsonString)
    topComment = JsonString()
    categoryID = StringType()
    userID = StringType(required=True)
    tags = ListType(JsonString)
    votes = IntType()
    unvotes = IntType()
    views = IntType()
    comments = IntType()
    id = IntType()
