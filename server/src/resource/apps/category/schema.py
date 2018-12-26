from schematics.types import StringType, ListType
from foundation.core.schema.model import BaseModel


class Category(BaseModel):
    class Options:
        serialize_when_none = True
    categoryID = StringType(required=True)
    name = StringType(required=True)
    userFollows = ListType(StringType)


class Tag(BaseModel):
    class Options:
        serialize_when_none = True
    id = StringType(required=True)
    text = StringType(required=True)
    tagID = StringType(required=True)
    userFollows = ListType(StringType)
