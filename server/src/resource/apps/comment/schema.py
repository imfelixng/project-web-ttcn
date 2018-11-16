from schematics.types import StringType, ListType
from foundation.core.schema.model import BaseModel


class Comment(BaseModel):
    commentID = StringType(required=True)
    userID = StringType(required=True)
    questionID = StringType(required=True)
    content = StringType(required=True)
    image = ListType(StringType)
