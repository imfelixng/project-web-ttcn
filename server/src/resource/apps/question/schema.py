from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType, DictType


class Question(BaseModel):
    questionID = StringType(required=True)
    title = StringType()
    userID = StringType(required=True)
    tagIDs = ListType(DictType(StringType))
    categoryID = StringType()
    views = ListType(StringType)
    likes = ListType(StringType)
    topComment = DictType(StringType)
