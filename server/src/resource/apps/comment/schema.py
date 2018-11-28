from schematics.types import StringType, IntType
from foundation.core.schema.model import BaseModel


class Comment(BaseModel):
    commentID = StringType(required=True)
    userID = StringType(required=True)
    questionID = StringType(required=True)
    content = StringType(required=True)
    votes = IntType(required=True)
    unvote = IntType(required=True)
