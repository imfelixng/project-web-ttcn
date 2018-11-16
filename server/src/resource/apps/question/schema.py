from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, DictType


class Question(BaseModel):
    questionID = StringType(required=True)
    title = StringType(required=True)
    content = StringType(required=True)
    userID = StringType(required=True)
    image = ListType(StringType)
    tags = ListType(StringType)
    categoryID = StringType()
    views = ListType(StringType)
    likes = ListType(StringType)
